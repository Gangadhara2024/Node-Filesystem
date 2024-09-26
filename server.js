const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log("url ==>", req.url + "  " + "method ==>", req.method);
//   const data = "HTTP FILE server in file system";

//   if (req.method === "GET" && req.url === "/home") {
//     return res.end("home API is running");
//   } else if (req.method === "GET" && req.url === "/writefile") {
//     fs.writeFile("demo.txt", data, (err) => {
//       if (err) throw err;
//       return res.end("write succesful");
//     });
//   } else if (req.method === "GET" && req.url === "/appendfile") {
//     fs.appendFile("demo.txt", data, (err) => {
//       if (err) throw err;
//       return res.end("append successfull");
//     });
//   } else if (req.method === "GET" && req.url === "/readfile") {
//     fs.readFile("demo.txt", (err, data) => {
//       if (err) throw err;
//       console.log(data);
//       return res.end(data);
//     });
//   } else if (req.method === "GET" && req.url === "/deletefile") {
//     fs.unlink("demo.txt", (err) => {
//       if (err) throw err;
//       return res.end("deleted file successfull");
//     });
//   } else if (req.method === "GET" && req.url === "/renamefile") {
//     fs.rename("demo.txt", "newDemo.txt", (err) => {
//       if (err) throw err;
//       return res.end("rename succesfull");
//     });
//   } else if (req.method === "GET" && req.url === "/streamfile") {
//     const rStream = fs.createReadStream("demo.txt");

//     rStream.on("data", (char) => {
//       return res.end(char);
//     });
//     rStream.on("end", () => {
//       return res.end();
//     });
//   } else {
//     res.end(`API not found => ${req.method} ${req.url}`);
//   }
// });

server.on("request", (req, res) => {
  if (req.method === "POST" && req.url === "/fileupload") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) throw err;
      console.log("fields:", fields, "files:", files);

      const oldpath = files.fileUpload[0].filepath;
      const newpath =
        __dirname + "/uploads/" + files.fileUpload[0].originalFilename;

      fs.copyFile(oldpath, newpath, (err) => {
        if (err) throw err;
        console.log("file copied succesfully");

        fs.unlink(oldpath, (err) => {
          if (err) throw err;
          console.log("file deleted from old path");
          return res.end("file uploaded succesfully");
        });
      });
    });
  } else {
    fs.readFile("form.html", (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
});
server.listen(8000, () => {
  console.log("HTTP SERVER ON");
});
// const form = new formidable.IncomingForm() ==> creates a new instance of IncomingForm, which is used to parse incoming form data, including file uploads.
