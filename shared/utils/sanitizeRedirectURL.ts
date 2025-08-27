import getSafeRedirectURL from "./getSafeRedirectURL";

export default function(target: string | undefined) {
    let from = getSafeRedirectURL(target);
    return encodeURIComponent(from);
}
