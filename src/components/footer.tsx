import Link from "next/link";

const footer: React.FC = () => {
    return (<div className="relative bottom-0 w-full bg-gray-200 py-2 px-4 text-xs text-gray-600">
        <i className="relative left-0">v1.0.5</i>
        <Link href="https://www.musi-ci.nl/">Musi-CI Game ©2023 JokeVeltmanMuziek</Link>
    </div>);
}

export default footer;
