const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const fs = require("fs");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegPath);

const inputPath = path.join(__dirname, "../public/background-video.mp4");
const outputPath = path.join(__dirname, "../public/background-video-compressed.mp4");

console.log("FFmpeg path:", ffmpegPath);
console.log("Compressing video...");

ffmpeg(inputPath)
  .videoCodec("libx264")
  .videoBitrate("1500k")
  .outputOptions([
    "-movflags +faststart",
    "-an",
    "-pix_fmt yuv420p"
  ])
  .on("progress", (progress) => {
    console.log(`Processing: ${progress.percent?.toFixed(1)}%`);
  })
  .on("end", () => {
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    
    console.log(`\nOriginal: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Reduction: ${((1 - compressedSize/originalSize) * 100).toFixed(1)}%`);
    
    // Replace original
    fs.renameSync(outputPath, inputPath);
    console.log("\nDone! Video replaced with streaming-optimized version.");
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  })
  .save(outputPath);
