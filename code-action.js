exports.main = async (event, callback) => {

  let hubspot_installed = false;

  // normalizing domain
  const domain = event.inputFields['domain']
  .replace("www.", "")
  .replace("https://", "")
  .replace("http://","");

  try {
    const res = await fetch(`https://www.${domain}`); 
    const source = await res.text(); 

    if ( source.includes("hs-script") || source.includes("hubspot")) { 
      hubspot_installed = true;
    }
  }

  catch(err) {
    throw Error("Failed to scrape the website... ")
  }

  callback({
    outputFields: {
      hubspot_installed: hubspot_installed
    }
  });
}
