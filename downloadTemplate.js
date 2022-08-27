import Scraper from "./scrape/lib/scraper.js";


define(function () {

    return {
        submit: function(template_link , directory){
            const options = {
                urls: [template_link],
                directory: 'sites/'+directory
            };
            console.log('2');
            // const scrape = scraper(options).scrape()
            const scraper = require(["scrape/lib/scraper"], function (scraper){
                return new Scraper(options).scrape();
            });
            console.log(scraper);
            scraper(options);
        }
    };
});



