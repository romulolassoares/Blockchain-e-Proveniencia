var resultUser = await UserDatabase.findOne({ pki: userPki });
// console.log(resultUser)
provData = await query.getAllData(resultUser, rede);

// console.log(provData)
provJson = JSON.parse(provData);

console.log(provJson[0].Record.docType);

for (let i = 0; i < provJson.length; i++) {
  if (provJson[i].Record.docType === "provenance") {
    console.log(provJson[i]);
  }
}
