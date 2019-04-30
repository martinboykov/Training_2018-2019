const ITEMS_PER_PAGE = 1;
const PAGES_PER_VIEW = 3;

async function pagination(req, Model) {
    const page = parseInt(req.query.page, 10);
    const itemsCount = await Model.countDocuments();
    const totalPagesCount = Math.ceil(itemsCount / ITEMS_PER_PAGE);
    const pages = Array
        .from(Array(totalPagesCount < PAGES_PER_VIEW ? totalPagesCount : PAGES_PER_VIEW).keys())
        .map((number, i) => {
            if (page === 1) {
                number = number + 1; return number;
            }
            number = page - 1 + i; return number;
        });
    while (pages[pages.length - 1] > totalPagesCount) {
        pages.splice(pages.length - 1, 1);
    }
    const items = await Model.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({ title: 1 });
    return {
        page,
        totalPagesCount,
        pages,
        items,
    };
}

module.exports = pagination;
