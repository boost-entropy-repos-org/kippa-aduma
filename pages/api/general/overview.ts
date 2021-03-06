import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getOverview } from "server/db/general.controller";
import withDBConnection from "utils/middlewares/mongodb";

// GET /api/general/recent-highlights
const overviewHandler = withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getOverview());
    } catch (error) {
        log("Caught error while attempting to fetch overview data:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});

export default withDBConnection(overviewHandler);
