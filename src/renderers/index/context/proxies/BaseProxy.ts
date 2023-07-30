import IAppContext from "../../providers/IAppContext";

export default abstract class BaseProxy {

    private readonly _context: IAppContext;

    constructor(context: IAppContext) {
        this._context = context;
    }

    get context(): IAppContext {
        return this._context;
    }

    abstract dispose(): void;
}