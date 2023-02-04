import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomButton from "components/CustomButton";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";
import { ListCart } from "components/listCart";
import { slugGenerator } from "utils/convert";
import qs from 'qs';

export default function Header() {
	const navigate = useNavigate();

	const [showCategory, setShowCategory] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [searchCategory, setSearchCategory] = useState("all");

	const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);
	const user = useSelector(({ auth }) => auth.data);
	const categories = useSelector(({ category }) => category.data);

	const handleCloseCategory = () => setShowCategory(false);

	const handleSearch = (e) => {
		e.preventDefault();

		const queryObject = {};
		if(searchKeyword)  queryObject.s = slugGenerator(searchKeyword);
		if(searchCategory !== 'all') queryObject.c = searchCategory;

		navigate(`/product?${qs.stringify(queryObject)}`);
	}

	return (
		<header>
			<nav
				id="header"
				className="w-full z-30 top-0 shadow-lg"
			>
				<div className="2xl:container mx-auto">
				<div className="border-b">
					<div className="2xl:container 2xl:mx-auto 2xl:px-0 flex items-center justify-between px-[60px]">
						{isLogedIn ? (
							<div className="text-sm z-[100]">Hi <span className="font-bold">{user.fullname}</span></div>
						) : (
							<div className="text-sm z-[100]">
								Hi!{" "}
								<Link to="/auth/sign-in" className="text-indigo-700 hover:underline hover:text-indigo-800 font-semibold">Sign In</Link>
								{" "}or{" "}
								<Link to="/auth/sign-up" className="text-indigo-700 hover:underline hover:text-indigo-800 font-semibold">Sign up</Link>
							</div>
						)}

						<div
							className="order-2 md:order-3 flex items-center"
							id="nav-content"
						>
							<a className="inline-block no-underline hover:text-black" href="#">
								<svg
									className="fill-current hover:text-black"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
								>
									<circle fill="none" cx="12" cy="7" r="3" />
									<path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
								</svg>
							</a>
							<ListCart />
						</div>
					</div>
				</div>

				<div className="border-b-[2px]">
					<div className="2xl:container 2xl:mx-auto 2xl:px-0 relative min-h-[65px] flex items-center px-[60px] py-4">
						<Link to="/">
							<img alt="Logo" src="/large-logo.png" />
						</Link>
						<div className="ml-4 relative px-2" onMouseLeave={handleCloseCategory}>
							<button
								className="py-[2px] px-4 max-w-[120px] text-gray-600 font-medium hover:text-indigo-700 bg-white
					flex items-center border-[3px] border-transparent focus:border-inherit rounded"
								onClick={() => setShowCategory(!showCategory)}
							>
								<span className="mr-2">Shop by category</span>
								{showCategory ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
							</button>
							{showCategory && Array.isArray(categories) && categories.length > 0 && (
								<div className="absolute border-[3px] min-w-[600px] bg-white shadow-xl">
									<div className="p-[20px] grid grid-cols-3 gap-3">
										{categories.map((item, index) => (
											<div key={index}>
												<div className="font-semibold flex items-center mb-[4px]">
													<Link to={`/category/${item.slug}`}>
														{item.name} <KeyboardArrowRightIcon />
													</Link>
												</div>
												<div className="ml-[5px]">
													{item.child?.map((c, cIndex) => (
														<Link
															className="block text-sm mb-[6px] text-gray-800 hover:text-indigo-700"
															key={cIndex}
															to={`/category/${c.slug}`}
														>
															{c.name}
														</Link>
													))}
												</div>
											</div>
										))}
									</div>
									<div className="px-[20px] py-3 font-semibold text-indigo-700 text-right">
										<Link to="/category">
											See all categories <KeyboardArrowRightIcon />
										</Link>
									</div>
								</div>
							)}
						</div>
						<form onSubmit={handleSearch} autoComplete="off" className="flex-1 flex items-center" autoCorrect="off">
							<div className="flex items-center flex-1 h-[48px] border-[2px] border-black mr-4">
								<SearchIcon className="text-gray-400 ml-4" />
								<input
									value={searchKeyword}
									onChange={(e) => setSearchKeyword(e.target.value)}
									className="ml-2 flex-1 focus:outline-none placeholder:text-gray-400"
									placeholder="Search for anything"
									spellCheck={false}
								/>
								<select
									value={searchCategory}
									className="box-content h-full px-2 focus:outline-none border-l border-black max-w-[140px] text-ellipsis"
									onChange={(e) => setSearchCategory(e.target.value)}
								>
									<option value="all">All categories</option>
									{Array.isArray(categories) && categories.map((item, index) => (
										<option key={index} value={item.slug}>{item.name}</option>
									))}
								</select>
							</div>
							<CustomButton className="px-[16px] py-[8px] min-w-[168px] h-[42px] text-xl font-normal" type="submit">Search</CustomButton>
						</form>
					</div>
				</div>
				</div>
			</nav>
		</header>
	);
}
