// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

// PLY Loader, adapted from THREE.js (MIT license)
//
// Attributions per original THREE.js source file:
//
// @author Wei Meng / http://about.me/menway
//
// Description: A loader for PLY ASCII files (known as the Polygon File Format
// or the Stanford Triangle Format).
//
// Limitations: ASCII decoding assumes file is UTF-8.
//
// If the PLY file uses non standard property names, they can be mapped while
// loading. For example, the following maps the properties
// “diffuse_(red|green|blue)” in the file to standard color names.
//
// parsePLY(data, {
//   propertyNameMapping: {
//     diffuse_red: 'red',
//     diffuse_green: 'green',
//     diffuse_blue: 'blue'
//   }
// });
import type {
  PLYMesh,
  PLYHeader,
  PLYAttributes,
  MeshHeader,
  PLYElement,
  PLYProperty
} from './ply-types';
import normalizePLY from './normalize-ply';

export type ParsePLYOptions = {
  propertyNameMapping?: Record<string, string>;
};

/**
 * @param data
 * @param options
 * @returns
 */
export function parsePLY(data: ArrayBuffer | string, options: ParsePLYOptions = {}): PLYMesh {
  let header: PLYHeader & MeshHeader;
  let attributes: PLYAttributes;

  if (data instanceof ArrayBuffer) {
    const text = new TextDecoder().decode(data);
    header = parseHeader(text, options);
    attributes = header.format === 'ascii' ? parseASCII(text, header) : parseBinary(data, header);
  } else {
    header = parseHeader(data, options);
    attributes = parseASCII(data, header);
  }

  return normalizePLY(header, attributes);
}

/**
 * @param data
 * @param options
 * @returns header
 */
function parseHeader(data: any, options?: ParsePLYOptions): PLYHeader {
  const PLY_HEADER_PATTERN = /ply([\s\S]*)end_header\s/;

  let headerText = '';
  let headerLength = 0;

  const result = PLY_HEADER_PATTERN.exec(data);

  if (result !== null) {
    headerText = result[1];
    headerLength = result[0].length;
  }
  const lines = headerText.split('\n');
  const header = parseHeaderLines(lines, headerLength, options);

  return header;
}

/**
 * @param lines
 * @param headerLength
 * @param options
 * @returns header
 */
// eslint-disable-next-line complexity
function parseHeaderLines(
  lines: string[],
  headerLength: number,
  options?: ParsePLYOptions
): PLYHeader {
  const header: PLYHeader = {
    comments: [],
    elements: [],
    headerLength
  };

  let lineType: string | undefined;
  let lineValues: string[];
  let currentElement: PLYElement | null = null;

  for (let i = 0; i < lines.length; i++) {
    let line: string = lines[i];
    line = line.trim();

    if (line === '') {
      // eslint-disable-next-line
      continue;
    }

    lineValues = line.split(/\s+/);
    lineType = lineValues.shift();
    line = lineValues.join(' ');

    switch (lineType) {
      case 'format':
        header.format = lineValues[0];
        header.version = lineValues[1];
        break;

      case 'comment':
        header.comments.push(line);
        break;

      case 'element':
        // Start new element, store previous element
        if (currentElement) {
          header.elements.push(currentElement);
        }

        currentElement = {
          name: lineValues[0],
          count: parseInt(lineValues[1], 10),
          properties: []
        };
        break;

      case 'property':
        if (currentElement) {
          const property = makePLYElementProperty(lineValues);
          if (options?.propertyNameMapping && property.name in options?.propertyNameMapping) {
            property.name = options?.propertyNameMapping[property.name];
          }
          currentElement.properties.push(property);
        }
        break;

      default:
        // eslint-disable-next-line
        console.log('unhandled', lineType, lineValues);
    }
  }

  // Store in-progress element
  if (currentElement) {
    header.elements.push(currentElement);
  }

  return header;
}

/** Generate attributes arrays from the header */
// eslint-disable-next-line complexity
function getPLYAttributes(header: PLYHeader): PLYAttributes {
  // TODO Generate only the attribute arrays actually in the header
  const attributes = {
    indices: [],
    vertices: [],
    normals: [],
    uvs: [],
    colors: []
  };

  for (const element of header.elements) {
    if (element.name === 'vertex') {
      for (const property of element.properties) {
        switch (property.name) {
          case 'x':
          case 'y':
          case 'z':
          case 'nx':
          case 'ny':
          case 'nz':
          case 's':
          case 't':
          case 'red':
          case 'green':
          case 'blue':
            break;
          default:
            // Add any non-geometry attributes
            attributes[property.name] = [];
            break;
        }
      }
    }
  }

  return attributes;
}

/**
 * @param propertyValues
 * @returns property of ply element
 */
function makePLYElementProperty(propertyValues: string[]): PLYProperty {
  const type = propertyValues[0];
  switch (type) {
    case 'list':
      return {
        type,
        name: propertyValues[3],
        countType: propertyValues[1],
        itemType: propertyValues[2]
      };
    default:
      return {
        type,
        name: propertyValues[1]
      };
  }
}

/**
 * Parses ASCII number
 * @param n
 * @param type
 * @returns
 */
// eslint-disable-next-line complexity
function parseASCIINumber(n: string, type: string): number {
  switch (type) {
    case 'char':
    case 'uchar':
    case 'short':
    case 'ushort':
    case 'int':
    case 'uint':
    case 'int8':
    case 'uint8':
    case 'int16':
    case 'uint16':
    case 'int32':
    case 'uint32':
      return parseInt(n, 10);

    case 'float':
    case 'double':
    case 'float32':
    case 'float64':
      return parseFloat(n);

    default:
      throw new Error(type);
  }
}

/**
 * @param properties
 * @param line
 * @returns ASCII element
 */
function parsePLYElement(properties: any[], line: string) {
  const values: any = line.split(/\s+/);

  const element = {};

  for (let i = 0; i < properties.length; i++) {
    if (properties[i].type === 'list') {
      const list: any = [];
      const n = parseASCIINumber(values.shift(), properties[i].countType);

      for (let j = 0; j < n; j++) {
        list.push(parseASCIINumber(values.shift(), properties[i].itemType));
      }

      element[properties[i].name] = list;
    } else {
      element[properties[i].name] = parseASCIINumber(values.shift(), properties[i].type);
    }
  }

  return element;
}

/**
 * @param data
 * @param header
 * @returns [attributes]
 */
function parseASCII(data: any, header: PLYHeader): PLYAttributes {
  // PLY ascii format specification, as per http://en.wikipedia.org/wiki/PLY_(file_format)

  const attributes = getPLYAttributes(header);

  let result: RegExpExecArray | null;

  const patternBody = /end_header\s([\s\S]*)$/;
  let body = '';
  if ((result = patternBody.exec(data)) !== null) {
    body = result[1];
  }

  const lines = body.split('\n');
  let currentElement = 0;
  let currentElementCount = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    line = line.trim();

    if (line !== '') {
      if (currentElementCount >= header.elements[currentElement].count) {
        currentElement++;
        currentElementCount = 0;
      }

      const element = parsePLYElement(header.elements[currentElement].properties, line);
      handleElement(attributes, header.elements[currentElement].name, element);
      currentElementCount++;
    }
  }

  return attributes;
}

/**
 * @param buffer
 * @param elementName
 * @param element
 */
// eslint-disable-next-line complexity
function handleElement(
  buffer: {[index: string]: number[]},
  elementName: string,
  element: any = {}
) {
  if (elementName === 'vertex') {
    for (const propertyName of Object.keys(element)) {
      switch (propertyName) {
        case 'x':
          buffer.vertices.push(element.x, element.y, element.z);
          break;
        case 'y':
        case 'z':
          break;

        case 'nx':
          if ('nx' in element && 'ny' in element && 'nz' in element) {
            buffer.normals.push(element.nx, element.ny, element.nz);
          }
          break;
        case 'ny':
        case 'nz':
          break;

        case 's':
          if ('s' in element && 't' in element) {
            buffer.uvs.push(element.s, element.t);
          }
          break;
        case 't':
          break;

        case 'red':
          if ('red' in element && 'green' in element && 'blue' in element) {
            buffer.colors.push(element.red, element.green, element.blue);
          }
          break;
        case 'green':
        case 'blue':
          break;

        default:
          buffer[propertyName].push(element[propertyName]);
      }
    }
  } else if (elementName === 'face') {
    const vertexIndices = element.vertex_indices || element.vertex_index; // issue #9338

    if (vertexIndices.length === 3) {
      buffer.indices.push(vertexIndices[0], vertexIndices[1], vertexIndices[2]);
    } else if (vertexIndices.length === 4) {
      buffer.indices.push(vertexIndices[0], vertexIndices[1], vertexIndices[3]);
      buffer.indices.push(vertexIndices[1], vertexIndices[2], vertexIndices[3]);
    }
  }
}

/**
 * Reads binary data
 * @param dataview
 * @param at
 * @param type
 * @param littleEndian
 * @returns [number, number]
 */
// eslint-disable-next-line complexity
function binaryRead(dataview: DataView, at: number, type: any, littleEndian: boolean): number[] {
  switch (type) {
    // corespondences for non-specific length types here match rply:
    case 'int8':
    case 'char':
      return [dataview.getInt8(at), 1];
    case 'uint8':
    case 'uchar':
      return [dataview.getUint8(at), 1];
    case 'int16':
    case 'short':
      return [dataview.getInt16(at, littleEndian), 2];
    case 'uint16':
    case 'ushort':
      return [dataview.getUint16(at, littleEndian), 2];
    case 'int32':
    case 'int':
      return [dataview.getInt32(at, littleEndian), 4];
    case 'uint32':
    case 'uint':
      return [dataview.getUint32(at, littleEndian), 4];
    case 'float32':
    case 'float':
      return [dataview.getFloat32(at, littleEndian), 4];
    case 'float64':
    case 'double':
      return [dataview.getFloat64(at, littleEndian), 8];

    default:
      throw new Error(type);
  }
}

/**
 * Reads binary data
 * @param dataview
 * @param at
 * @param properties
 * @param littleEndian
 * @returns [object, number]
 */
function binaryReadElement(
  dataview: DataView,
  at: number,
  properties: {[index: string]: any},
  littleEndian: boolean
): {}[] {
  const element = {};
  let result: number[];
  let read = 0;

  for (let i = 0; i < properties.length; i++) {
    if (properties[i].type === 'list') {
      const list = [];

      result = binaryRead(dataview, at + read, properties[i].countType, littleEndian);
      const n = result[0];
      read += result[1];

      for (let j = 0; j < n; j++) {
        result = binaryRead(dataview, at + read, properties[i].itemType, littleEndian);
        // @ts-ignore
        list.push(result[0]);
        read += result[1];
      }

      element[properties[i].name] = list;
    } else {
      result = binaryRead(dataview, at + read, properties[i].type, littleEndian);
      element[properties[i].name] = result[0];
      read += result[1];
    }
  }

  return [element, read];
}

type BinaryAttributes = {
  [index: string]: number[];
};

/**
 * Parses binary data
 * @param data
 * @param header
 * @returns [attributes] of data
 */
function parseBinary(data: ArrayBuffer, header: PLYHeader): BinaryAttributes {
  const attributes = getPLYAttributes(header);

  const littleEndian = header.format === 'binary_little_endian';
  const body = new DataView(data, header.headerLength);
  let result: any[];
  let loc = 0;

  for (let currentElement = 0; currentElement < header.elements.length; currentElement++) {
    const count = header.elements[currentElement].count;
    for (let currentElementCount = 0; currentElementCount < count; currentElementCount++) {
      result = binaryReadElement(
        body,
        loc,
        header.elements[currentElement].properties,
        littleEndian
      );
      loc += result[1];
      const element = result[0];

      handleElement(attributes, header.elements[currentElement].name, element);
    }
  }

  return attributes;
}
