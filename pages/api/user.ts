import { withAuthenticatedUser } from "utils/session";
import log, { LogTypes } from "utils/logger";
import { GeneralErrors } from "server/errors";
import { getAllUsers } from "server/db/user/controller";
import withDBConnection from "utils/middlewares/mongodb";

// GET /api/user
const userHandler = withAuthenticatedUser(async (req, res) => {
    if (req.method !== "GET") return res.status(404).send("Invalid api call");

    try {
        return res.status(200).json(await getAllUsers());
    } catch (error) {
        log("Caught error while attempting to fetch users:", LogTypes.ERROR, error);
        return res.status(500).send(GeneralErrors.UnknownError);
    }
});

export default withDBConnection(userHandler);
