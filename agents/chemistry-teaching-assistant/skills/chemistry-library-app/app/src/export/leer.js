// Stands in for image-size in the browser bundle (pptxgenjs needs it only for local files in Node).
export default function imageSize() { return { width: 0, height: 0 }; }
export const imageSize2 = imageSize;
