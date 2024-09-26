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
