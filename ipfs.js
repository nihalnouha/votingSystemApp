const {ipfsClient, globSource, create} = require(‘ipfs-http-client’)

const projectId = ‘YOUR_INFURA_PROJECT_ID’;
const projectSecret = ‘YOUR_INFURA_PROJECT_SECRET’;
async function addFile(){
const auth =
'Basic ’ + Buffer.from(projectId + “:” + projectSecret).toString(‘base64’)

const client = await create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth
    }
  })

  for await (const file of client.addAll(globSource("image0.jpeg", "**/*"))) {
    console.log(file)
  }
}

addFile()