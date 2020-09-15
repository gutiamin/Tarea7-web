const fs = require("fs");
const url = require("url");
const http = require("http");
const axios = require("axios");

const urlProveedores =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlClientes =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

// fs.writeFile("newFile.txt", "Contenido:", "utf-8", (err) => {
//   if (err) console.log("Error!");
// });
let objProv, objClie;

// let readFile = (callback) => {
//   fs.readFile("index.html", (err, data) => {
//     //Operación
//     let pageContent = data.toString();
//     let newContent = createTableProveedores(objProv).toString();
//     pageContent = pageContent.replace("{{replace}}", newContent);
//     callback(pageContent);
//   });
// };

let createTableProveedores = (objectArray) => {
  fs.readFile("index.html", (err, data) => {
    let countProveedor = 1;
    let table = document.createElement("table");
    table.setAttribute("class", "table-stripped");
    let tableHead = document.createElement("thead");
    table.appendChild(tableHead);
    let tr_th = document.createElement("tr");
    tableHead.appendChild(tr_th);
    let th_ID = document.createElement("th");
    th_ID.setAttribute("scope", "col");
    let textTh_ID = document.createTextNode("ID");
    th_ID.appendChild(textTh_ID);
    let th_NombreComp = document.createElement("th");
    th_NombreComp.setAttribute("scope", "col");
    let textTh_NombreComp = document.createTextNode("Nombre Compañía");
    th_NombreComp.appendChild(textTh_NombreComp);
    let th_NombreCont = document.createElement("th");
    th_NombreCont.setAttribute("scope", "col");
    let textTh_NombreCont = document.createTextNode("Nombre Contacto");
    th_ID.appendChild(textTh_NombreCont);
    tr_th.appendChild(th_ID);
    tr_th.appendChild(th_NombreComp);
    tr_th.appendChild(th_NombreCont);
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    objectArray.forEach((obj) => {
      let tableRow = document.createElement("tr");
      let tableHeader = document.createElement("th");
      tableHeader.setAttribute("scope", "row");
      let textTableHeader = document.createTextNode(obj.idproveedor);
      tableHeader.appendChild(textTableHeader);
      tableRow.appendChild(tableHeader);
      let tableNomComp = document.createElement("td");
      let textNomComp = document.createTextNode(obj.nombrecompania);
      tableNomComp.appendChild(textNomComp);
      tableRow.appendChild(tableNomComp);
      let tableNomCont = document.createElement("td");
      let textNomCont = document.createTextNode(obj.nombrecontacto);
      tableNomCont.appendChild(textNomCont);
      tableRow.appendChild(tableNomCont);
      tableBody.appendChild(tableRow);
      countProveedor++;
    });
    //Operación
    let pageContent = data.toString();
    let newContent = table.toString();
    pageContent = pageContent.replace("{{replace}}", newContent);
    callback(pageContent);
  });
};

let createTableClientes = (objectArray) => {
  fs.readFile("index.html", (err, data) => {
    let countClientes = 1;
    let table = document.createElement("table");
    table.setAttribute("class", "table-stripped");
    let tableHead = document.createElement("thead");
    table.appendChild(tableHead);
    let tr_th = document.createElement("tr");
    tableHead.appendChild(tr_th);
    let th_ID = document.createElement("th");
    th_ID.setAttribute("scope", "col");
    let textTh_ID = document.createTextNode("ID");
    th_ID.appendChild(textTh_ID);
    let th_NombreComp = document.createElement("th");
    th_NombreComp.setAttribute("scope", "col");
    let textTh_NombreComp = document.createTextNode("Nombre Compañía");
    th_NombreComp.appendChild(textTh_NombreComp);
    let th_NombreCont = document.createElement("th");
    th_NombreCont.setAttribute("scope", "col");
    let textTh_NombreCont = document.createTextNode("Nombre Contacto");
    th_ID.appendChild(textTh_NombreCont);
    tr_th.appendChild(th_ID);
    tr_th.appendChild(th_NombreComp);
    tr_th.appendChild(th_NombreCont);
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);

    objectArray.forEach((obj) => {
      let tableRow = document.createElement("tr");
      let tableHeader = document.createElement("th");
      tableHeader.setAttribute("scope", "row");
      let textTableHeader = document.createTextNode(obj.idclieinte);
      tableHeader.appendChild(textTableHeader);
      tableRow.appendChild(tableHeader);
      let tableNomComp = document.createElement("td");
      let textNomComp = document.createTextNode(obj.nombrecompania);
      tableNomComp.appendChild(textNomComp);
      tableRow.appendChild(tableNomComp);
      let tableNomCont = document.createElement("td");
      let textNomCont = document.createTextNode(obj.nombrecontacto);
      tableNomCont.appendChild(textNomCont);
      tableRow.appendChild(tableNomCont);
      tableBody.appendChild(tableRow);
      countClientes++;
    });
    //Operación
    let pageContent = data.toString();
    let newContent = table.toString();
    pageContent = pageContent.replace("{{replace}}", newContent);
    callback(pageContent);
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    if (url.parse(req.url, true).path === "/api/proveedores") {
      axios.get(urlProveedores).then((response) => {
        console.log(response.data);
        objProv = response.data;
        createTableProveedores(response.data);
      });
      // getProveedoresJSON((data) => {
      //     res.end(data.toString())
      // })
    } else if (url.parse(req.url, true).path === "/api/clientes") {
      axios.get(urlClientes).then((response) => {
        console.log(response.data);
        objClie = response.data;
        createTableClientes(response.data);
      });
      // getClientesJSON((data) => {
      //     res.end(data.toString())
      // })
    }
    res.end(data.toString());

    // readFile((data) => {
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.end(data.toString());
    // });
  })
  .listen(8081);
