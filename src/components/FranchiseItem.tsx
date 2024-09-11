import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { NFLFranchise } from "../models/franchise";

export type Props = {
    franchise: NFLFranchise;
    index: number;
		editFranchise: (franchise: NFLFranchise) => void;
};

const deleteNFLFranchise = async (id: number) => {
  const response = await axios.delete(`http://localhost:5000/api/Franchise/DeleteFranchise?Id=${id}`)
	return response.data;
}

const FranchiseItem = (props: Props) => {
	const {franchise, index, editFranchise} = props;
	const queryClient = useQueryClient();
  const mutation = useMutation(
		deleteNFLFranchise,
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['nflFranchises']);
			}
		}
	);
    
  const onDeleteFranchise = () => {
    mutation.mutate(franchise.id);
  };;

	const onEditFranchise = () => {
		editFranchise(franchise)
	} 

  return (
		<li key={franchise.id} style={{padding: 10}}>
			<div>
				<span style={{padding: 10}}>Power Ranking: {index + 1}</span>
				<span style={{padding: 10}}>Power Rating: {franchise.powerRating}</span>
				<span style={{padding: 10}}>{franchise.name}</span>
				<button style={{padding: 10}} onClick={onEditFranchise}>Edit Franchise</button>
				<button style={{padding: 10}} onClick={onDeleteFranchise}>Delete Franchise</button>
			</div>		
		</li>
  );
};
export default FranchiseItem;