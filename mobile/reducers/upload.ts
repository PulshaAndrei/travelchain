export function pinFileToIPFS(data) {
  return async () => {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };

    const hash = (await (await fetch('http://localhost:5001/api/v0/add', config)).json()).Hash;
    return `http://localhost:8080/ipfs/${hash}`;
  }
}