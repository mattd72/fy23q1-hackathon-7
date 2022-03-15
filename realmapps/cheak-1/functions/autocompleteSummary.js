exports = async (summary) => {
    const collection = context.services.get("mongodb-atlas").db("hackaton").collection("issue");
    return await collection
        .aggregate([
            {
                $search: {
                    autocomplete: {
                        path: "summary",
                        query: summary,
                        fuzzy: { maxEdits: 1 },
                    },
                },
            },
            {
                $project: {
                    summary: 1,
                },
            },
            {
                $limit: 10,
            },
        ])
        .toArray();
};