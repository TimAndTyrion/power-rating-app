import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { NFLFranchise } from "../models/franchise";

export type Props = {
	franchise: NFLFranchise;
};

const addNFLFranchise = async (newFranchise: NFLFranchise) => {
  const response = await axios.post("http://localhost:5000/api/NFLFranchise/AddNFLFranchise", newFranchise);
	return response.data;
}

const editNFLFranchise = async (editFranchise: NFLFranchise) => {
	const response = await axios.patch("http://localhost:5000/api/NFLFranchise/UpdateNFLFranchise", editFranchise);
	return response.data;
}

const FranchiseForm = (props: Props) => {
	const {franchise} = props;
	const [isAddNew, setIsAddNew] = useState(true);
	const [franchiseName, setFranchiseName] = useState('');
	const [franchiseRating, setFranchiseRating] = useState(0);
	const [franchiseCity, setFranchiseCity] = useState('');
	const [franchiseState, setFranchiseState] = useState('');
	const queryClient = useQueryClient();

	useEffect(() => {
		setIsAddNew(franchise.id === 0);
		setFranchiseName(franchise.name);
		setFranchiseRating(franchise.powerRating);
		setFranchiseCity(franchise.city);
		setFranchiseState(franchise.state);
	}, [franchise]);

  const postMutation = useMutation(
		addNFLFranchise, 
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['nflFranchises']);
			}
		}
	);

	const patchtMutation = useMutation(
		editNFLFranchise,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['nflFranchises']);
			}
		});

	const resetForm = () => {
		setIsAddNew(true);
		setFranchiseName('');
		setFranchiseRating(0);
		setFranchiseCity('');
		setFranchiseState('');
	}

  const submitData = () => {
		if (isAddNew) {
			postMutation.mutate({id: 0, name: franchiseName, city: franchiseCity, state: franchiseState, country: 'USA', league: 'NFL', powerRating: franchiseRating, powerRanking: 0 }); 
		}
		   
		if (!isAddNew) {
			patchtMutation.mutate({id: franchise.id, name: franchiseName, city: franchiseCity, state: franchiseState, country: 'USA', league: 'NFL', powerRating: franchiseRating, powerRanking: franchise.powerRanking}); 
		}
		resetForm();
  };

	const onRatingChange = (event: { target: { value: string; }; }) => {
		const rating = parseFloat(event.target.value);
		setFranchiseRating(rating);
	}

  return (
		<div>
			<div style={{padding: 10, paddingLeft: 10}}>
				Franchise Name: <input
					type="text"
					value={franchiseName}
					onChange={(e) => setFranchiseName(e.target.value)}
					placeholder="Name"
				/>&nbsp;
				Power Rating: <input
					style={{paddingLeft: 10}}
					type="text"
					value={franchiseRating}
					onChange={onRatingChange}
					placeholder="Power Rating"
				/>
			</div>
			<div style={{padding: 10}}>
				Franchise Location: <input
					type="text"
					value={franchiseCity}
					onChange={(e) => setFranchiseCity(e.target.value)}
					placeholder="city"
				/>,
				<input
					type="text"
					value={franchiseState}
					onChange={(e) => setFranchiseState(e.target.value)}
					placeholder="state"
				/>		
			
		</div>
		<button onClick={submitData}>{isAddNew ? 'Add New' : 'Update'}</button>
	</div>
  );
};
export default FranchiseForm;