export function Header({listItems, logo}) {

    const items = listItems.map(item => <li><a className="hover:text-cyan-500 transition-colors" href="">{item}</a>
    </li>);

    return (
        <div className="shadow bg-white">
            <div className="h-16 mx-auto px-5 flex items-center justify-between">
                <div className="flex items-center justify-between">
                    {logo && <img src={logo} alt="logo" className="h-8"/>}
                    <a className="text-2xl hover:text-cyan-500 transition-colors cursor-pointer">CoursReact</a>
                </div>
                <ul className="flex items-center gap-5">
                    {items}
                </ul>
            </div>
        </div>
    )
}