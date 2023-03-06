// Learn from:
//   https://github.com/diafygi/webcrypto-examples#aes-gcm

async function run() {
  const cryptoKey = await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  )

  const exportedKey = await crypto.subtle.exportKey("raw", cryptoKey)

  const importedKey = await crypto.subtle.importKey(
    "raw",
    exportedKey,
    {
      name: "AES-GCM",
    },
    true,
    ["encrypt", "decrypt"],
  )

  const exportedAgainKey = await crypto.subtle.exportKey("raw", importedKey)

  console.log({
    cryptoKey,
    exportedKey,
    importedKey,
    exportedAgainKey,
  })

  const data = new TextEncoder().encode("top secret")

  const iv = crypto.getRandomValues(new Uint8Array(12))

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    data,
  )

  console.log({ data, encryptedData })

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    encryptedData,
  )

  console.log({ data, decryptedData })

  console.log(new TextDecoder().decode(data))
  console.log(new TextDecoder().decode(new Uint8Array(decryptedData)))
}

run()
