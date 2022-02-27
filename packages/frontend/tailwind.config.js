const production = !process.env.ROLLUP_WATCH;
module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [
    ],
    mode: "jit",
    purge: {
        enabled: !process.env.ROLLUP_WATCH,
        content: ['./public/index.html', './src/**/*.svelte'],
        options: {
            defaultExtractor: content => [
                ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
                ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
            ],
        },
    },
};