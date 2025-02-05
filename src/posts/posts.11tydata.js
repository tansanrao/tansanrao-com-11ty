module.exports = {
	toc: function(data) {
		return data.toc !== false;
	},
	permalink: function ({ title, date }) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		return `/blog/${year}/${month}/${this.slugify(title)}/index.html`;
	},
};