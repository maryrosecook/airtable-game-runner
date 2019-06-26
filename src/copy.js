(function(exports) {
  async function update(records) {
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      let fieldUpdates = Object.keys(record.fields)
        .filter(fieldName => fieldName.match(/ copy$/))
        .reduce((fields, fieldName) => {
          fields[fieldName] = record.fields[fieldName.replace(/ copy/, "")];
          return fields;
        }, {});

      if (Object.keys(fieldUpdates).length > 0) {
        await record.updateFields(fieldUpdates);
      }
    }
  }

  exports.copy = { update };
})(this);
