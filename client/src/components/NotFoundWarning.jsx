import React from 'react'
import { LuFileSearch2 } from "react-icons/lu";

const NotFoundWarning = () => {
	return (
		<div className="text-center mt-7 bg-base-200 p-10 rounded-2xl">
			<div className="mb-2">
				<LuFileSearch2 size={44} className="mx-auto" />
			</div>
			<h2 className="text-4xl font-bold mb-2">404 | Not Found</h2>
			<p className="text-base-content">The business you are looking for does not exists in this area.</p>
			<a href='/' className="text-base-content underline">Refresh</a>
		</div>
	)
}

export default NotFoundWarning