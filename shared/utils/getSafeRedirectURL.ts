const defaultPath = "/";

export default function(target: string | undefined) {
    /**
     * Safe redirect URL should always start with /.
     * If URL starts with %, then it's either encoded or malicious.
     * We do not care about preserving the second option, so we will try to decode it.
     */
    let from = defaultPath;
    if (typeof target === "string") {
        let path = target;
        if (path.startsWith("%")) {
            try {
                path = decodeURIComponent(path);
            } catch {
                path = defaultPath;
            }
        }

        if (path.startsWith("/")) {
            // Can be possibly /foo/../bar, can't think of a solution at the moment.
            from = path;
        }
        else {
            from = defaultPath;
        }
    }
    return from;
}
