const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Normalizes scraped job/opportunity object into ElevateHire standard schema
 */
const normalizeOpportunity = (data) => ({
  title: data.title?.trim() || 'Untitled Opportunity',
  company: data.company?.trim() || 'Government / Public Sector',
  location: data.location?.trim() || 'Remote / Various',
  type: data.type || 'Full-time', // Full-time, Internship, Micro-project, Govt
  category: data.category || 'Government',
  description: data.description?.trim() || 'No detailed description provided.',
  applicationLink: data.link || '',
  eligibility: data.eligibility || '0-2 Years / Freshers',
  deadline: data.deadline ? new Date(data.deadline) : null,
  source: data.source || 'Aggregator',
  isVerified: true
});

/**
 * Scrapes public government job updates (Portal Scraping Module)
 */
const scrapeGovJobs = async () => {
  try {
    // Example portal fetching - customized for structured public listings
    const { data: html } = await axios.get('https://news.google.com/search?q=government+jobs+recruitment+freshers', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 8000
    });

    const $ = cheerio.load(html);
    const opportunities = [];

    $('article').slice(0, 10).each((i, el) => {
      const title = $(el).find('h3').text();
      const link = $(el).find('a').attr('href');
      const snippet = $(el).find('div').text();

      if (title && link) {
        const fullLink = link.startsWith('.') ? `https://news.google.com${link.substring(1)}` : link;
        opportunities.push(normalizeOpportunity({
          title,
          company: 'Public Sector Recruitment',
          location: 'India / Multiple Regions',
          type: 'Govt',
          category: 'Government',
          description: snippet || 'Public recruitment notice for eligible candidates.',
          link: fullLink,
          source: 'Gov Portal Engine'
        }));
      }
    });

    return opportunities;
  } catch (error) {
    console.error('[Scraper Service Error]:', error.message);
    return [];
  }
};

module.exports = {
  scrapeGovJobs,
  normalizeOpportunity
};