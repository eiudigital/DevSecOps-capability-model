function generateTable(id, headings, data, options) {
  const cfg = {};

  const sortAscending = true;
  const table = d3.select(id).append("table");
  const titles = d3.values(headings);
  const headers = table
    .append("thead")
    .append("tr")
    .selectAll("th")
    .data(titles)
    .enter()
    .append("th")
    .text((d)=> d)
    .on("click", function (d) {
      headers.attr("class", "header");

      if (sortAscending) {
        rows.sort(function (a, b) {
          return b[d] < a[d];
        });
        sortAscending = false;
        this.className = "aes";
      } else {
        rows.sort(function (a, b) {
          return b[d] > a[d];
        });
        sortAscending = true;
        this.className = "des";
      }
    });

  const rows = table
    .append("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

  // add row data and hovering bootstrap tooltips
  rows
    .selectAll("td")
    .data((data) => {
      return titles.map((title) => {
        return {
          value: data[title].value,
          name: title,
          description: data[title].description,
        };
      });
    })
    .enter()
    .append("td")
    .attr("data-th", (d) => d.name)
    .attr("title", (d) => d.name)
    .attr("data-content", (d) => d.description)
    .attr("data-toggle", "popover")
    .text((d) => d.value);
}