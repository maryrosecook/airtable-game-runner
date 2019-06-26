(function(exports) {
  let airtable = require("airtable");

  airtable.configure({ apiKey: config.AIRTABLE_API_KEY });

  async function record(table, name) {
    return (await airtable
      .base("appNvfaqp9yHWFUml")
      .table(table)
      .select({ filterByFormula: `{Name} = '${name}'` })
      .firstPage())[0];
  }

  async function table(table) {
    return await (await airtable
      .base("appNvfaqp9yHWFUml")
      .table(table)
      .select()).all();
  }

  exports.data = {
    record,
    table
  };
})(this);
