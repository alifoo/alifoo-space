import path from 'path';

export default function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ "public": "/" });

	eleventyConfig.addNunjucksFilter("readableDate", function(dateObj) {
		const options = { year: 'numeric', month: 'short', day: 'numeric' };
		return new Date(dateObj).toLocaleDateString('en-US', options);
	});

	return {
		dir: {
			input: ".",
			includes: "_includes",
			data: "_data",
			output: "_site"
		},
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
};
