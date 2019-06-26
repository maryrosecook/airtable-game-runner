(function(exports) {
  async function update(records) {
    for (let i = 0; i < records.length; i++) {
      let record = records[i];

      let fieldUpdates = Object.keys(record.fields)
        .filter(fieldName => fieldName.match(/ init/))
        .reduce((fields, fieldName) => {
          fields[fieldName.replace(/ init/, "")] = record.fields[fieldName];
          return fields;
        }, {});

      await record.updateFields(fieldUpdates);
    }
  }

  exports.init = { update };
})(this);
