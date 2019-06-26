(async function run() {
  let inputRecord = await data.record("Input", "1");

  let entities = await loadEntities();
  await draw.loadImages(entities);

  await init.update(entities);

  startTick(200, async () => {
    await input.update(inputRecord);
    await copy.update(entities);
    draw.update(entities);
  });
})();

async function loadEntities() {
  return (await Promise.all(
    (await data.table("EntityTables"))
      .map(entityTable => entityTable.fields.Name)
      .map(data.table)
  )).reduce((flattenedArray, array) => flattenedArray.concat(array), []);
}

function startTick(minTickInterval, tick) {
  async function scheduleNextTick(tickIn) {
    setTimeout(async () => {
      let tickedAt = Date.now();

      await tick();
      let tickIn = Math.max(minTickInterval - (Date.now() - tickedAt), 0);
      scheduleNextTick(tickIn);
    }, tickIn);
  }

  scheduleNextTick(0);
}
