//based on: https://github.com/akitten/linkedin-public-profile-parser
import cheerio from 'cheerio';

/**
 * profile method finds data in a give public profile page
 * @param {String} url - a valid Linkedin profile url
 * @param {String} html - the full html for the public profile page
 * @returns {Object} data - the complete Linkedin Profile for the given url
 */
export default (url, html) => {
    let $ = cheerio.load(html); // use Server-Side JQuery to access DOM
    let data = { url: url, skills:[], education:[] };    // store all parsed data inside data object

    // 1.	Name of the person
    data.fullname = $('#name').find('.full-name').text();

    // minimal check to make sure we working on the right HTML
    if(!data.fullname) throw new Error('Incorrect Linkedin public profile');

    // 2.	Current title
    data.currentTitle = $('#headline').find('.title').text().trim();

    // 3.	Current position
    data.currentPosition = $('#overview-summary-current').find('.new-miniprofile-container a').text().trim();

    // 4.	Summary
    data.summary = $('.summary > .description').text();

    // 5.	List of skills
    let skills = $('li.endorse-item .endorse-item-name-text');
    skills.map((idx,href) => data.skills.push(href.children[0].data));

    // 6.	Experience
    let experience = [];
    let positions = $('#background-experience').find('.section-item');

    positions.map((idx, position) => {
        let pos = $(position);
        let title = pos.find('a[href$="mprofile_title"]').text();
        let company = pos.find('a[href$="prof-exp-company-name"]').text();
        let dates = pos.find('.experience-date-locale').text();
        let locality = pos.find('.locality').text();
        let description = pos.find('.description').html();
        experience.push({title, company, dates, locality, description});
    });

    experience.map(exp => exp.current = !!exp.dates.match(/Present/));
    data.experience = experience;
    // let current = [], past = [];
    // experience.map(exp => (exp.dates.match(/Present/) ? current : past).push(exp));
    // data.experience = {current, past};

    // 7.	Education
    let schools = $('#background-education').find('.section-item');
    schools.map((idx, school) => {
        let edu = $(school);
        let title = edu.find('a[href$="school-name"]').text();
        let degree = edu.find('.degree').text();
        let field = edu.find('a[href$="field_of_study"]').text();
        let dates = edu.find('.education-date').text();
        data.education.push({title, degree, field, dates});
    });

    return data;
};