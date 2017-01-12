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
            $('.menu-icon-link').click()
            expect($('body').hasClass('menu-hidden')).toBe(false);

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
        //how to use beforeEach and what to do with the done(),
        // where to include it,how to check the asynchronous loadFeed().
        //the entries.length should not be zero

        beforeEach(function(done) {
            //check whether the loadFeed function has completed the ajax request
            //now call the done function
            //execute the loadFeed function
            loadFeed(1, done)
            //done();
        });

        it('atleast one entry is present in the feed container', function(done) {
            var $Entry = $(".feed .entry");
            // referred this link https://api.jquery.com/length/ for the below function.
            expect($Entry.length).toBeGreaterThan(0);
            expect($Entry.text()).not.toBe('');
            //loadFeed.entriesLen is undefined
            done()
        });

    });

    describe('New Feed Selection', function() {

        beforeEach(function(done) {
            loadFeed(1, done);
        });
        /* TODO: Write a new test suite named "New Feed Selection"

                /* TODO: Write a test that ensures when a new feed is loaded
                 * by the loadFeed function that the content actually changes.
                 * Remember, loadFeed() is asynchronous.
                 */
        it('feed content actually changes', function() {

        });




    });



}());