exports = async (input) => {
    const collection = context.services.get("mongodb-atlas").db("hackathon").collection("issue");
    const { term, genres, countries } = input;
    const searchShould = [];
    const searchMust = [];

    if (term.length > 0) {
        const termStage = {
            autocomplete: {
                path: "summary",
                query: term,
                fuzzy: { maxEdits: 1.0 },
            },
        };
        searchMust.push(termStage);

        const descriptionStage = {
            text: {
                query: term,
                path: "description",
            },
        };
        searchShould.push(descriptionStage);
    }

    if (genres.length > 0) {
        const genresStage = {
            text: {
                query: genres,
                path: "genres",
            },
        };
        searchMust.push(genresStage);
    }

    if (countries.length > 0) {
        const countryStage = {
            text: {
                query: countries,
                path: "countries",
            },
        };
        searchMust.push(countryStage);
    }

    const searchQuery = [
        {
            $search: {
                compound: {
                    should: searchShould,
                    must: searchMust,
                },
                highlight: { path: ["summary", "description"] },
            },
        },
        {
            $project: {
                _id: 1,
                summary: 1,
                description: 1,
                cast: 1,
                assignee: 1,
                reporter: 1,
                status: 1,
                type: 1,
                score: { $meta: "searchScore" },
                highlights: { $meta: "searchHighlights" },
            },
        },
        { $limit: 20 },
    ];

    return await collection.aggregate(searchQuery).toArray();
};