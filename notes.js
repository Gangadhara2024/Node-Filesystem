// The File System(fs):- module in Node.js provides functions to interact with the file system, allowing you to work with files and directories.
// server creation using HTTP method.(instead of using 'express' framwork).

// const http = require("http");
// const server = http.createServer();

// server.on("request", (req, res) => {
//   console.log(req.url + " " + req.method);

//   if (req.method === "GET" && req.url === "/home") {
//     return res.end("server in up and running");
//   } else {
//     return res.end(`Api not found : ${req.method} ${req.url} `);
//   }
// });
// server.listen(8000, () => {
//   console.log("http server on... PORT:8000");
// });
// in HTTP method server, we create apis as in above code.
// we should create our own api by if condition as method and url.

// @@@@ CRUD(create, read, update, delete) are performed using file system.
// const http = require("http");
// const fs = require("fs");

// const server = http.createServer();

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

// server.listen(8000, () => {
//   console.log("HTTP SERVER ON");
// });
// this is how, we can write data into demo.txt file using server.
// fs.writeFile ==> takes 'file we want to add data', 'data' that we want to add data into file, and callback error.

// writeFile ==> overwrites the existing data and it will automatically create demo.txt file.
// appendfile ==> adds data with existing old data.
// readFile ==> read that file data and in browser it shows in format of <buffer>.
// unlink ==> will delete the file.
// rename ==> will delete old file and create new file, and old file data is copied to new file.
// ReadStream ==> is a readable stream used to read data from a file, rather than reading the entire file into memory at once.
// ReadStream will take demo.txt as file, and will read charcter by charcter and after finishing data reading, it is stopped by 'end' method.
//

// FILE upload using HTTP SERVER.
// file saving to uploads. how file is added from browser to vscode.
// const http = require("http");
// const fs = require("fs");
// const formidable = require("formidable");

// const server = http.createServer();
// server.on("request", (req, res) => {
//   if (req.method === "POST" && req.url === "/fileupload") {
//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//       if (err) throw err;
//       console.log("files", files);

//       const oldpath = files.fileUpload[0].filepath;
//       const newpath =
//         __dirname + "/uploads/" + files.fileUpload[0].originalFilename;

//       fs.copyFile(oldpath, newpath, (err) => {
//         if (err) throw err;
//         console.log("file copied done");

//         fs.unlink(oldpath, (err) => {
//           if (err) throw err;
//           console.log("file deleted from old path");
//           return res.end("files uploaded done");
//         });
//       });

//       return res.end("file upload successfull");
//     });
//   } else {
//     fs.readFile("form.html", (err, data) => {
//       if (err) throw err;
//       return res.end(data);
//     });
//   }
// });
// server.listen(8000, () => {
//   console.log("http server on... PORT:8000");
// });

// FILE upload using express js:
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

app.get("/upload", (req, res) => {
  return res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/fileupload" method="POST" enctype="multipart/form-data">
       Select file to upload:
      <input type="file" name="image" /><br>
      <button type="submit">submit</button>
    </form>
  </body>
</html>`);
});

app.post("/fileupload", (req, res) => {
  console.log(req.files);
  const { image } = req.files;

  if (!image) {
    return res.status(400).json("file upload failed");
  }
  image.mv(__dirname + "/uploads/" + image.name);

  return res.send("file uploaded succesfully");
});
app.listen(8000, () => {
  console.log("server is on 8000");
});
// express-fileupload: This middleware simplifies file upload handling. It attaches uploaded files to the req.files object for easier access.
// The fileUpload() middleware is registered with Express to handle incoming file uploads. It parses incoming form data that includes files.
// .mv() method:- is a function provided by the express-fileupload middleware. It stands for "move" and is used to move the file from its temporary location (where it's uploaded) to a destination of your choice on the server.
