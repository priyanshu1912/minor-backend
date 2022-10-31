const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors");
const PORT = 8000;

var app = express();

app.use(cors());

const url = "https://www.investing.com/equities/tata-motors-ltd-balance-sheet";

app.get("/", (req, res) => {
  axios(url)
    .then((response) => {
      const data = response.data;
      const $ = cheerio.load(data);

      const keys = [];

      let name = "#leftColumn > div.instrumentHead > h1";
      let price = "#last_last";
      let change =
        "#quotes_summary_current_data > div.left.current-data > div.inlineblock > div.top.bold.inlineblock > span.arial_20.greenFont.pid-18425-pcp.parentheses";
      price = $(price).text();
      name = $(name).text();
      change = $(change).text();

      const selector1 = "#header_row";
      $(selector1).each((parentIndex, parentEle) => {
        $(parentEle)
          .children()
          .each((childIndex, childEle) => {
            let value = $(childEle).text();
            keys.push(value);
          });
      });

      const table = [];

      const selector = "#childTr > td > div > table > tbody > tr";
      $(selector).each((parentIndex, parentEle) => {
        let obj = {};

        $(parentEle)
          .children()
          .each((childIndex, childEle) => {
            let value = $(childEle).text();
            obj[keys[childIndex]] = value;
          });
        table.push(obj);
      });

      let table2 = [];
      const head = "#rrtable > table > tbody:nth-child(2) > tr";
      $(head).each((parentIndex, parentEle) => {
        let obj = {};

        $(parentEle)
          .children()
          .each((childIndex, childEle) => {
            let value = $(childEle).text();
            obj[keys[childIndex]] = value;
          });

        table2.push(obj);
      });

      let newTable = [];
      const head2 = "#parentTr";
      $(head2).each((parentIndex, parentEle) => {
        let obj = {};

        $(parentEle)
          .children()
          .each((childIndex, childEle) => {
            let value = $(childEle).text();
            obj[keys[childIndex]] = value;
          });

        newTable.push(obj);
      });

      newTable.push(table2[10]);
      newTable.push(table2[11]);
      newTable.push(table2[12]);

      //console.log(table);
      res.send({ table, newTable, stock: { name, price, change } });
    })
    .catch((err) => console.log(err));
});

axios(url)
  .then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);

    const keys = [];

    let name = "#leftColumn > div.instrumentHead > h1";
    let price = "#last_last";
    let change =
      "#quotes_summary_current_data > div.left.current-data > div.inlineblock > div.top.bold.inlineblock > span.arial_20.greenFont.pid-18425-pcp.parentheses";
    price = $(price).text();
    name = $(name).text();
    change = $(change).text();

    const selector1 = "#header_row";
    $(selector1).each((parentIndex, parentEle) => {
      $(parentEle)
        .children()
        .each((childIndex, childEle) => {
          let value = $(childEle).text();
          keys.push(value);
        });
    });

    const table = [];

    const selector = "#childTr > td > div > table > tbody > tr";
    $(selector).each((parentIndex, parentEle) => {
      let obj = {};

      $(parentEle)
        .children()
        .each((childIndex, childEle) => {
          let value = $(childEle).text();
          obj[keys[childIndex]] = value;
        });
      table.push(obj);
    });

    let table2 = [];
    const head = "#rrtable > table > tbody:nth-child(2) > tr";
    $(head).each((parentIndex, parentEle) => {
      let obj = {};

      $(parentEle)
        .children()
        .each((childIndex, childEle) => {
          let value = $(childEle).text();
          obj[keys[childIndex]] = value;
        });

      table2.push(obj);
    });

    let newTable = [];
    const head2 = "#parentTr";
    $(head2).each((parentIndex, parentEle) => {
      let obj = {};

      $(parentEle)
        .children()
        .each((childIndex, childEle) => {
          let value = $(childEle).text();
          obj[keys[childIndex]] = value;
        });

      newTable.push(obj);
    });

    newTable.push(table2[10]);
    newTable.push(table2[11]);
    newTable.push(table2[12]);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on ${PORT}`));
