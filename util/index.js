const fetch = require('node-fetch');

module.exports = {
    /**
     * Post a string to paste.nomsy.net
     * @param {string} code String to post
     * @param {string} lang Code language to use
     * @returns {string} Link to the paste
     */
    postHaste: async (code, lang = '') => {
        try {
            if (code.length > 400000) {
                return 'Document exceeds maximum length.';
            }
            const res = await fetch('https://paste.nomsy.net/documents', { method: 'POST', body: code });
            const { key, message } = await res.json();
            if (!key) {
                return message;
            }
            return `https://paste.nomsy.net/${key}${lang && `.${lang}`}`;
        } catch (err) {
            throw err;
        }
    },
}