export default function (id: number | string): string {
    let result = id.toString();
    result = result.padStart(10, "0");
    return result;
}