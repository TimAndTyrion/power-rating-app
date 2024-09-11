import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { NFLFranchise } from "../models/franchise";
import FranchiseItem from "./FranchiseItem";
import FranchiseForm from "./FranchiseForm";

const retrievePosts = async () => {
  const {data} = await axios.get(
    "http://localhost:5000/api/NFLFranchise/GetNFLFranchises/",
  );
  return data;
};

const FranchiseList = () => {
	const defaultFranchise = {id: 0, name: '', city: '', state: '', country: 'USA', league: 'NFL', powerRating: 0, powerRanking: 0 };
	const {
    data: franchises,
    error,
    isLoading,
  } = useQuery({queryKey: "nflFranchises", queryFn: retrievePosts});
	const [editFranchise, setEditFranchise] = useState<NFLFranchise>(defaultFranchise);
    
	if (isLoading) return <div>Fetching posts...</div>;
  	if (error) return <div>An error occurred: {error.message}</div>;

	const sortedFranchises = [...franchises].sort((a,b) => b.powerRating - a.powerRating);
	
	return (
		<div>
			<div>
				<ul>
					{sortedFranchises.map((franchise: NFLFranchise, index: number) => (
						<FranchiseItem key={franchise.id} franchise={franchise} index={index} editFranchise={setEditFranchise} />
					))}
				</ul>
			</div>
			<div>
				<FranchiseForm franchise={editFranchise} />
			</div>
    </div>
  );
};
export default FranchiseList;