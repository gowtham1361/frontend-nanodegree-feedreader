/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function() {
            //used forEach loop to iterate and access the url of allFeeds array
            allFeeds.forEach(function(url) {
                expect(url).toBeDefined();
                expect(url).not.toBe('');
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function() {
            //used forEach loop to iterate and access the name of allFeeds array
            allFeeds.forEach(function(name) {
                expect(name).toBeDefined();
                expect(name).not.toBe('');
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element hidden by default', function() {
            //initially the body contains a menu-hidden class
            //using jquery to use .hasClass
            expect($('body').hasClass('menu-hidden')).toBe(true);
            //expect($.contains('.menu-hidden','body')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu visibility changes when the menu icon is clicked', function() {
            //clicking the menu-icon-link the menu-hidden class is toggled.
            //initially the menu is hidden or the .menu-hidden class is present
            //triggering the click event on the .menu-icon-link  manually
            //and checking whether the  menu-hidden class is toggled.
            $('.menu-icon-link').click()
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //again triggering click to check if the class menu-hidden is toggled
            $('.menu-icon-link').click()
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    describe('Initial Entries', function() {

        /* TODO: Write a new test suite named "Initial Entries" */

        beforeEach(function(done) {
            //execute the loadFeed function passing in index and callback done()
            loadFeed(1, function() {
                done();
            });
        });

        it('atleast one entry is present in the feed container', function(done) {
            //.feed container class is where the feeds are appended from app.js .
            //It uses hadlebar.js for templating the feeds by entryTemplate with .tpl-entry class.
            var $entry = $(".feed .entry-link .entry");
            // referred this link https://api.jquery.com/length/ for the below function.
            expect($entry.length).toBeGreaterThan(0);
            //verifying that there is some text present in the $entry
            expect($entry.text()).not.toBe('');
            //loadFeed.entriesLen is undefined
            done();
        });

    });

    describe('New Feed Selection', function() {
        //creating globally so that it can be accessed for comparison inside the it('feed content actually changes');
        var firstFeedOne,
            firstFeedTwo,
            headerOne,
            headerTwo;
        //check whether headertitle changes
        beforeEach(function(done) {
            loadFeed(1, function() {
                // Here in the anonymous callback we know that the feed has been loaded
                //we know that the the feeds append to the .entry class of the .feed container by looking at the app.js and the html file
                //and by inspecting in the console we find the first feeds h2 tags innerText (TITLE) by using the below selector.
                //storing the firstfeed of 'CSS Tricks'in firstFeedOne variable
                firstFeedOne = $('.entry-link .entry').find('h2')[0].innerText;
                //storing the header-title of the feed in headerOne
                headerOne = $('.header-title')[0].innerHTML;
                // done();//works fine even without this being included why so?
                // loading  next feed by chaining async requests as suggested by Karol mentor .
                loadFeed(2, function() {
                    //storing the firstfeed of 'HTML5 Rocks'in firstFeedTwo variable
                    firstFeedTwo = $('.entry-link .entry').find('h2')[0].innerText;
                    //storing the header-title of the feed in headerTwo
                    headerTwo = $('.header-title')[0].innerHTML;
                    done(); //notifying jasmine here that this async part has finished.
                });
            });
        });
        // note this part is working fine even without the done being used for async support.
        it('feed content actually changes', function() { // don't forget to tell jasmine to wait (asnyc support)
            //check whether the header-title changes for each time the loadFeed fn runs with different id,
            //if this changes then the feeds content change automatically.
            expect(headerOne == headerTwo).not.toBe(true);
            //comparing the two feeds of different links
            expect(firstFeedOne == firstFeedTwo).toBe(false);
            //done();
        });

    });

}());