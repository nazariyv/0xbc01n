import React, {useContext, useCallback, useEffect, useState} from 'react';
import {Switch, Route, NavLink, useRouteMatch, useParams} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';
import {BOUNTY_TYPES, COMPLEXITIES} from '../../types/type';
import {toAmount, getUserByAddr, getUserName, toData, getDateFormatted} from '../../utils/utils';
import Main from '../main';

const BountyPage: React.FC = () => {
    const {
        bounties,
        user,
        users,
        startWorkOnBounty,
        userBounties,
        bountyApplicant,
        getBountiesUserWorksOn,
        submitSubmissionForBounty,
        getBountySubmissions,
        bountySubmissions
    } = useContext(ApplicationContext);

    const { path, url } = useRouteMatch();
    const {bountyId} = useParams();
    const [isSubmissionSend, setSubmissionSend] = useState<boolean>(false);
    const bountyInfo = bounties.find(({id}) => id === Number(bountyId));
    const currentUserWorkOnThisBounty = userBounties.filter(({bounty_id}) => bounty_id === Number(bountyId)).length !== 0;
    const countOfSubmission = bountySubmissions[bountyId] && bountySubmissions[bountyId].length;
    const bountyApplicants = bountyApplicant[bountyId];

    useEffect(() => {
        getBountySubmissions(Number(bountyId));
    }, [bountyId]);

    const handleStartWork = useCallback(() => {
        if (user) {
            startWorkOnBounty(bountyId, user.addr);
            getBountiesUserWorksOn(user.addr);
            getBountySubmissions(Number(bountyId));
        }
    }, [bountyId, user, userBounties]);
    const sedSubmission = useCallback((evt) => {
        evt.preventDefault();

        const formData: Record<string, any> = {};
        const formFields = evt.target.querySelectorAll('.form__field');

        formFields.forEach((elem: HTMLInputElement) => {
            if (elem && elem.name) {
                formData[elem.name] = elem.value;
            }
        });

        submitSubmissionForBounty(Number(bountyId), formData);
        setSubmissionSend(true);
    });

    if (bountyInfo) {
        const {title, short_desc, price, expiry, type, complexity, desc, issuer, created} = bountyInfo;
        const now = new Date();
        const diffDays = new Date(expiry).getDate() - now.getDate();
        const typeKey =  type.split('.').pop().toUpperCase();
        const complexityKey = complexity.split('.').pop().toUpperCase();
        const issuerInfo = getUserByAddr(users, issuer);
        const issuerName = getUserName(issuerInfo);

        return (
            <Main>
                <div className='bounty'>
                    <div className='bounty__header'>
                        <div className='bounty__header_title'>{title}</div>
                        <div className='bounty__header_short_description'>{short_desc}</div>
                        <div className='bounty__header_tags tags'>
                            <div className='tag'>privacy</div>
                            <div className='tag'>oceanprotocol</div>
                            <div className='tag'>databounty</div>
                        </div>
                    </div>
                    <div className='bounty__content'>
                        <div className='bounty__content bounty__content_left'>
                            <div className='tabs'>
                                <NavLink className='tab no-link' activeClassName='active' to={`${url}/description`}>Description</NavLink>
                                <NavLink className='tab no-link' activeClassName='active' to={`${url}/contributors`}>Contributors</NavLink>
                                <NavLink className='tab no-link' activeClassName='active' to={`${url}/submissions`}>Submissions</NavLink>
                                <NavLink className='tab no-link' activeClassName='active' to={`${url}/activity`}>All Activity</NavLink>
                                {currentUserWorkOnThisBounty && (
                                    <NavLink className='tab no-link' activeClassName='active' to={`${url}/fulfill`}>Fulfill</NavLink>
                                )}
                                <div className='spacer'/>
                                {user && user.addr !== bountyInfo.issuer && !currentUserWorkOnThisBounty && (
                                    <button className='action-button' onClick={handleStartWork}>
                                        Start Work
                                    </button>
                                )}
                            </div>
                            <div className='tabs_content'>
                                <Switch>
                                    <Route exact path={`${path}/description`}>
                                        {desc}
                                    </Route>
                                    <Route path={`${path}/contributors`}>
                                        <div className='tabs_content__empty'>
                                            Bounty doesn't have any Contributors
                                        </div>
                                    </Route>
                                    <Route path={`${path}/submissions`}>
                                        <>
                                            {bountySubmissions[bountyId] && bountySubmissions[bountyId].length !== 0 && (
                                                <div className='tabs_content'>
                                                    {bountySubmissions[bountyId].map(item => (
                                                        <div className='submission' key={item.id}>
                                                            <div className='submission_content'>
                                                                <div className='submission__meta'>
                                                                    Author: <b>{item.addr}</b>
                                                                </div>
                                                                <div className='submission__title'>{item.name}</div>
                                                                <div className='submission_short_url'>
                                                                    <input type='text' className='form__input' value={item.sample_url} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {bountySubmissions[bountyId] && bountySubmissions[bountyId].length === 0 && (
                                                <div className='tabs_content__empty'>
                                                    Bounty doesn't have any Submissions
                                                </div>
                                            )}
                                        </>
                                    </Route>
                                    <Route path={`${path}/activity`}>
                                        <div className='tabs_content'>
                                            <div className='list'>
                                                {bountyApplicants && bountyApplicants.length !== 0 && bountyApplicants.map(item => (
                                                    <div key={item.worker_id} className='list__item'>
                                                        <div className='author'>
                                                            {getUserName(getUserByAddr(users, item.worker_id))}
                                                        </div>
                                                        <div className='title'>Work Started</div>
                                                        <div className='date'>-/-/-</div>
                                                    </div>
                                                ))}
                                                <div className='list__item'>
                                                    <div className='author'>
                                                        {getUserName(getUserByAddr(users, issuer))}
                                                    </div>
                                                    <div className='title'>Bounty Created</div>
                                                    <div className='date'>
                                                        {getDateFormatted(toData(created))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Route>
                                    <Route path={`${path}/fulfill`}>
                                        {isSubmissionSend && (
                                            <div className='tabs_content__empty'>
                                                Your submission was sent
                                            </div>
                                        )}
                                        {!isSubmissionSend && (
                                            <div className='tabs_content'>
                                                <h2>Enter Submission Details</h2>
                                                <p>Enter and submit the details for your bounty submission, including any links to content
                                                    that may be required for fulfillment as indicated by the bounty description.</p>
                                                <div className='form__wrapper'>
                                                    <form onSubmit={sedSubmission}>
                                                        <div className='form__row'>
                                                            <input type='hidden' className='form__field' id='addr' name='addr' value={user && user.addr}/>
                                                            <input type='hidden' className='form__field' id='price' name='price' value={bountyInfo.price}/>
                                                            <input type='hidden' className='form__field' id='name' name='name' value={bountyInfo.title}/>
                                                            <div className='form__label'>
                                                                <label htmlFor='name'>Sample url</label>
                                                            </div>
                                                            <div className='form__field'>
                                                                <input type='text' className='form__input form__field' id='sample_url' name='sample_url'/>
                                                            </div>
                                                        </div>
                                                        <div className='form__row'>
                                                            <div className='form__label'>
                                                                <label htmlFor='full_dataset_url'>Full url</label>
                                                            </div>
                                                            <div className='form__field'>
                                                                <input type='text' className='form__input form__field' id='full_dataset_url' name='full_dataset_url'/>
                                                            </div>
                                                        </div>
                                                        <div className='form__row'>
                                                            <div className='button_container'>
                                                                <button type='submit' className='action-button'>
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        )}
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                        <div className='bounty__content bounty__content_right'>
                            <div className='bounty__price'>
                                <div className='bounty__price_origin'>
                                    {toAmount(price)}&nbsp;OCEAN
                                </div>
                            </div>
                            <div className='bounty__info'>
                                <div className='bounty__info_item'>
                                    <div className='value'>Ready to work</div>
                                    <div className='label'>Status</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{diffDays} Days</div>
                                    <div className='label'>Time Left</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{COMPLEXITIES[complexityKey]}</div>
                                    <div className='label'>Experience Level</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{BOUNTY_TYPES[typeKey]}</div>
                                    <div className='label'>Type</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>
                                        {bountyApplicants === undefined ? <>-</> : <>{bountyApplicants.length}</>}
                                    </div>
                                    <div className='label'>Work Started</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>{countOfSubmission ? <>{countOfSubmission}</> : <>-</>}</div>
                                    <div className='label'>Work Submitted</div>
                                </div>
                            </div>
                            <div className='founder__info'>
                                <div className='founder__info_title'>Funder information</div>
                                <div className='founder__info_block'>
                                    <div className='founder__info_avatar'>
                                        <img src='https://gitcoin.co/dynamic/avatar/oceanprotocol' className='img'/>
                                    </div>
                                    <div className='founder__info_detail'>
                                        <div>{issuerName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        );
    }

    return null;
};

export default BountyPage;
