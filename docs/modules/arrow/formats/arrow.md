# Apache Arrow

![arrow-logo](../images/apache-arrow-small.png)
&emsp;
![apache-logo](../../../images/logos/apache-logo.png)

- _[`@loaders.gl/arrow`](/docs/modules/arrow)_ - loaders.gl implementation
- _[Apache Arrow](https://arrow.apache.org/)_ - A specification for large in-memory columnar data.
- _[ArrowJS](https://arrow.apache.org/docs/js)_ - official documentation on ArrowJS API.
- _[ArrowJS](/docs/arrowjs)_ - loaders.gl documentation on ArrowJS API.

The Apache Arrow project specifies a language-independent binary columnar memory format. It enables zero-copy shared memory and streaming messaging, interprocess communication, and is supported by many programming languages and data libraries.

This Apache Arrow specification supports encoding vectors and table-like containers of flat and nested data.

The Arrow spec is performance-optimized to eliminate memory copies and aligns columnar data in memory to minimize cache misses and take advantage of the latest SIMD (Single input multiple data) and GPU operations on modern processors.

Apache Arrow is emerging as a de-facto standard for large in-memory columnar data (Spark, Pandas, Drill, ...).

By standardizing on a common binary interchange format, big data systems can reduce the costs and friction associated with cross-system communication.
