(async() => {
    try{
            // Requires
        const fetch = require("node-fetch")
        const { JSDOM } = require("jsdom");

            // Utils
        const logger = msg => {
            console.log(msg)
        }
        const numCrawledPornstars = process.argv[2] || 1000
        const gender = process.argv[3] || "female"
        const skipPornstarsWithoutAge = process.argv[4] || false

            // Useful Information
        const pornstars = []
        const pornstarUrls = []

            // Let's go        
        let crtPage = 0
        while(++crtPage === 1 || pornstarUrls.length < numCrawledPornstars * 1.1) { // We take a little extra just to make sure we'll have enough in the end, after filtering some of them
            const url = `https://www.pornhub.com/pornstars?gender=${gender}&page=${crtPage}`
            logger(`Now crawling ${url}...`)
            
            const html = await (await fetch(url)).text()
            let document = (new JSDOM(html)).window.document
            if(!document.querySelector("#popularPornstars")) break // no more shit to crawl
            const listItems = document.querySelector("#popularPornstars").children

            for(let listItem of listItems) {
                if(listItem.className) continue // Skip divs with class names, because those aren't pornstar divs

                if(!listItem.children[0] || !listItem.children[0].children[1]) continue // Corrupt link
                const href = `https://www.pornhub.com${listItem.children[0].children[1].href}`
                pornstarUrls.push(href)
            }
            logger(`Number of pornstar urls: ${pornstarUrls.length}\n`)

            if(listItems.length === 0) break // no more shit to crawl
            ++crtPage
        }

        for(let url of pornstarUrls) {
            try{
                const html = await (await fetch(url)).text()
                // require("fs").writeFileSync("sal.html", html)
                document = (new JSDOM(html)).window.document

                logger(url)
                const rank = document.querySelector("div>span.big").parentElement.textContent.replace(/[a-zA-Z]/g, "").trim()
                const name = document.querySelector(".name").children[0].textContent.trim()

                const birthdateElement1 = document.querySelector("[itemprop=birthDate]")
                const birthdateElement2 = document.querySelector(".infoPiece")
                const birthdateInfo = birthdateElement1 
                    ? birthdateElement1.textContent.trim()
                    : birthdateElement2.textContent.replace(/[a-zA-Z:]/g, "").trim()

                if(skipPornstarsWithoutAge && !birthdateInfo) continue

                const birthDate = birthdateInfo.replace(",", "")
                logger(`${name} ${rank}, ${birthDate}`)
                pornstars.push({
                    name,
                    rank,
                    birthDate,
                    url
                })
                if(pornstars.length >= numCrawledPornstars) break
            } catch(e) {
                logger("Failed to mine this pornstar")
                logger(e)
            }
            logger(``)
        }

            // Finalisation
        logger(pornstars)
        const pornstarsObject = {
            gender,
            pornstars,
        }
        require("fs").writeFileSync(`./crawledData/pornstars_${new Date().getTime()}.json`, JSON.stringify(pornstarsObject, null, 4))
    } catch(e) {
        logger(e)
    }
})()