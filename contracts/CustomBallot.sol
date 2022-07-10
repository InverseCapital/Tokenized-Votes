// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IERC20Votes {
    function getPastVotes(address, uint256) external view returns (uint256);
}

/// @title A simple ballot contract
/// @notice You can use this contract to vote on proposals. Voting power is determined through an ERC20 voting token
contract CustomBallot {
    /// @notice event that triggers when a new vote is submitted
    event Voted(
        address indexed voter,
        uint256 indexed proposal,
        uint256 weight,
        uint256 proposalVotes
    );

    /// @notice a proposal that can be voted. Has a name and a counter of the votes received
    struct Proposal {
        bytes32 name;
        uint256 voteCount;
    }

    /// @notice how much vote power an address has already used for voting
    mapping(address => uint256) public spentVotePower;

    /// @notice list of all proposals
    Proposal[] public proposals;

    /// @notice address of the ERC20 token that is used to vote
    IERC20Votes public voteToken;

    /// @notice block number of when the voting power was snapshotted
    uint256 public referenceBlock;

    /// @param proposalNames names of the proposals that can be voted
    /// @param _voteToken address of the ERC20 token that should be used for votes
    constructor(bytes32[] memory proposalNames, address _voteToken) {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
        }
        voteToken = IERC20Votes(_voteToken);
        referenceBlock = block.number;
    }

    /// @return all the proposals
    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }

    /// @notice gives a number of votes to a chosen proposal
    /// @param proposal the proposal to vote for
    /// @param amount number of votes 
    function vote(uint256 proposal, uint256 amount) external {
        uint256 votingPowerAvailable = votingPower();
        require(votingPowerAvailable >= amount, "Has not enough voting power");
        spentVotePower[msg.sender] += amount;
        proposals[proposal].voteCount += amount;
        emit Voted(msg.sender, proposal, amount, proposals[proposal].voteCount);
    }

    /// @notice returns the current winning proposal
    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    /// @notice returns the name of the current winning proposal
    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }

    /// @notice returns the voting power of the sender
    function votingPower() public view returns (uint256 votingPower_) {
        votingPower_ =
            voteToken.getPastVotes(msg.sender, referenceBlock) -
            spentVotePower[msg.sender];
    }
}
