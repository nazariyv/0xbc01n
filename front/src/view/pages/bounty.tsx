import React, {useContext, useCallback, useEffect} from 'react';
import {Switch, Route, NavLink, useRouteMatch, useParams} from 'react-router-dom';
import {ApplicationContext} from '../../controller/context';
import {BOUNTY_TYPES, COMPLEXITIES} from '../../types/type';

import Main from '../main';

const exampleAsset = {
    main: {
        name: '10 Monkey Species Small',
        dateCreated: '2012-02-01T10:55:11Z',
        author: 'Mario',
        type: 'dataset',
        license: 'CC0: Public Domain',
        price: '0',
        files: [
            {
                index: 0,
                contentType: 'application/zip',
                checksum: '2bf9d229d110d1976cdf85e9f3256c7f',
                checksumType: 'MD5',
                contentLength: '12057507',
                compression: 'zip',
                encoding: 'UTF-8',
                url:
                    'https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/training.zip'
            },
            {
                index: 1,
                contentType: 'text/txt',
                checksum: '354d19c0733c47ef3a6cce5b633116b0',
                checksumType: 'MD5',
                contentLength: '928',
                url:
                    'https://s3.amazonaws.com/datacommons-seeding-us-east/10_Monkey_Species_Small/assets/monkey_labels.txt'
            }
        ]
    },
    additionalInformation: {
        categories: ['Biology'],
        tags: ['image data', 'classification', 'animals'],
        description: 'EXAMPLE ONLY ',
        copyrightHolder: 'Unknown',
        workExample: 'image path, id, label',
        links: [
            {
                name: 'example model',
                url:
                    'https://drive.google.com/open?id=1uuz50RGiAW8YxRcWeQVgQglZpyAebgSM'
            },
            {
                name: 'example code',
                type: 'example code',
                url: 'https://github.com/slothkong/CNN_classification_10_monkey_species'
            }
        ],
        inLanguage: 'en'
    }
};

const BountyPage: React.FC = () => {
    const {bounties, user, startWorkOnBounty, registerAsset, userBounties} = useContext(ApplicationContext);
    const { path, url } = useRouteMatch();
    const {bountyId} = useParams();
    const bountyInfo = bounties.find(({id}) => id === Number(bountyId));
    const currentUserWorkOnThisBounty = userBounties.find(({bounty_id}) => bounty_id === Number(bountyId));

    const handleStartWork = useCallback((bountyId, addr) => {
        startWorkOnBounty(bountyId, addr);
    }, []);

    const sedSubmission = useCallback((evt) => {
        evt.preventDefault();

        registerAsset(exampleAsset);
    });

    if (bountyInfo) {
        const {title, short_desc, price, expiry, type, complexity, desc, issuer} = bountyInfo;
        const now = new Date();
        const diffDays = new Date(expiry).getDate() - now.getDate();
        const typeKey =  type.split('.').pop().toUpperCase();
        const complexityKey = complexity.split('.').pop().toUpperCase();
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
                                <NavLink className='tab' activeClassName='active' to={`${url}/description`}>Description</NavLink>
                                <NavLink className='tab' activeClassName='active' to={`${url}/contributors`}>Contributors</NavLink>
                                <NavLink className='tab' activeClassName='active' to={`${url}/submissions`}>Submissions</NavLink>
                                <NavLink className='tab' activeClassName='active' to={`${url}/activity`}>All Activity</NavLink>
                                {Boolean(currentUserWorkOnThisBounty) && (
                                    <NavLink className='tab' activeClassName='active' to={`${url}/fulfill`}>Fulfill</NavLink>
                                )}
                                <div className='spacer'/>
                                {user && user.addr !== bountyInfo.issuer && !Boolean(currentUserWorkOnThisBounty) && (
                                    <button className='action-button' onClick={() => handleStartWork(bountyId, user.addr)}>
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
                                        <div className='tabs_content__empty'>
                                            Bounty doesn't have any Submissions
                                        </div>
                                    </Route>
                                    <Route path={`${path}/activity`}>
                                        <div className='tabs_content__empty'>
                                            Bounty doesn't have any Activities
                                        </div>
                                    </Route>
                                    <Route path={`${path}/fulfill`}>
                                        <div className='tabs_content'>
                                            <h2>Enter Submission Details</h2>
                                            <p>Enter and submit the details for your bounty submission, including any links to content
                                                that may be required for fulfillment as indicated by the bounty description.</p>
                                            <div className='form__wrapper'>
                                                <form onSubmit={sedSubmission}>
                                                    <div className='form__row'>
                                                        <div className='form__label'>
                                                            <label htmlFor='name'>Sample url</label>
                                                        </div>
                                                        <div className='form__field'>
                                                            <input type='text' className='form__input form__field' id='sample_url' name='sample_url'/>
                                                        </div>
                                                    </div>
                                                    <div className='form__row'>
                                                        <div className='form__label'>
                                                            <label htmlFor='name'>Full url</label>
                                                        </div>
                                                        <div className='form__field'>
                                                            <input type='text' className='form__input form__field' id='full_url' name='full_url'/>
                                                        </div>
                                                    </div>
                                                    <div className='form__row'>
                                                        <div className='form__label'>
                                                            <label htmlFor='about_me'>Description</label>
                                                        </div>
                                                        <div className='form__field'>
                                                            <textarea className='form__textarea form__field' id='desc' name='desc'/>
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
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                        <div className='bounty__content bounty__content_right'>
                            <div className='bounty__price'>
                                <div className='bounty__price_origin'>{price}&nbsp;OCEAN</div>
                                {/*<div className='bounty__price_from'>Converted from:&nbsp;USD 22489,00, EUR 20047,16, GBP
                                    18226,69
                                </div>*/}
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
                                    <div className='value'>-</div>
                                    <div className='label'>Applicants</div>
                                </div>
                                <div className='bounty__info_item'>
                                    <div className='value'>-</div>
                                    <div className='label'>Work Submitted</div>
                                </div>
                            </div>
                            <div className='founder__info'>
                                <div className='founder__info_title'>Funder information</div>
                                <div className='founder__info_block'>
                                    <div className='founder__info_avatar'>
                                        <img src='https://gitcoin.co/dynamic/avatar/keep-network' className='img'/>
                                    </div>
                                    <div className='founder__info_detail'>
                                        <div>{issuer}</div>
                                        <div>-//-</div>
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
