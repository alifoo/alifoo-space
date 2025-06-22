import path from 'path';

export default function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ "public": "/" });

	const readableDateFilter = (dateObj) => {
		const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
		return new Date(dateObj).toLocaleDateString('en-US', options);
	};

	eleventyConfig.addNunjucksFilter("readableDate", readableDateFilter);
	eleventyConfig.addLiquidFilter("readableDate", readableDateFilter);

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
