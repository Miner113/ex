import {
    Button,
    Dropdown,
} from '@openware/components';
import cr from 'classnames';
import countries = require('i18n-iso-countries');
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import MaskInput from 'react-maskinput';
import {
  connect,
  MapDispatchToPropsFunction,
} from 'react-redux';
import { formatDate, isDateInFuture } from '../../../helpers';
import {RootState, selectCurrentLanguage} from '../../../modules';
import {
    selectSendIdentitySuccess,
    sendIdentity,
} from '../../../modules/user/kyc/identity';
import { labelFetch } from '../../../modules/user/kyc/label';
import { nationalities } from '../../../translations/nationalities';

interface ReduxProps {
    success?: string;
    lang: string;
}

interface DispatchProps {
    sendIdentity: typeof sendIdentity;
    labelFetch: typeof labelFetch;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface IdentityState {
    city: string;
    countryOfBirth: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    metadata: {
        nationality: string,
    };
    postcode: string;
    residentialAddress: string;
    cityFocused: boolean;
    dateOfBirthFocused: boolean;
    firstNameFocused: boolean;
    lastNameFocused: boolean;
    postcodeFocused: boolean;
    residentialAddressFocused: boolean;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class IdentityComponent extends React.Component<Props, IdentityState> {
    public state = {
        city: '',
        countryOfBirth: '',
        dateOfBirth: '',
        firstName: '',
        lastName: '',
        metadata: {
            nationality: '',
        },
        postcode: '',
        residentialAddress: '',
        cityFocused: false,
        dateOfBirthFocused: false,
        firstNameFocused: false,
        lastNameFocused: false,
        postcodeFocused: false,
        residentialAddressFocused: false,
    };

    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public componentDidUpdate(prev: Props) {
        if (!prev.success && this.props.success) {
            this.props.labelFetch();
        }
    }

    public render() {
        const {
            city,
            dateOfBirth,
            firstName,
            lastName,
            postcode,
            residentialAddress,
            cityFocused,
            dateOfBirthFocused,
            firstNameFocused,
            lastNameFocused,
            postcodeFocused,
            residentialAddressFocused,
            countryOfBirth,
            metadata,
        } = this.state;
        const { success, lang } = this.props;

        const cityGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': cityFocused,
        });

        const dateOfBirthGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': dateOfBirthFocused,
        });

        const firstNameGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': firstNameFocused,
        });

        const lastNameGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': lastNameFocused,
        });

        const postcodeGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': postcodeFocused,
        });

        const residentialAddressGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': residentialAddressFocused,
        });

        const dataNationalities = nationalities.map(value => {
            return this.translate(value);
        });
        const onSelectNationality = value => this.selectNationality(dataNationalities[value]);

        /* tslint:disable */
        countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/ru.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/zh.json"));
        /* tslint:enable */

        const dataCountries = Object.values(countries.getNames(lang));
        const onSelectCountry = value => this.selectCountry(dataCountries[value]);

        return (
          <div className="pg-confirm__content-identity">
            <div className="pg-confirm__content-identity-forms">
                <div className="pg-confirm__content-identity-col">
                    <div className="pg-confirm__content-identity-col-row">
                      <fieldset className={firstNameGroupClass}>
                          {firstName && <legend>{this.translate('page.body.kyc.identity.firstName')}</legend>}
                              <input
                                  className="pg-confirm__content-identity-col-row-content-number"
                                  type="string"
                                  placeholder={this.translate('page.body.kyc.identity.firstName')}
                                  value={firstName}
                                  onChange={this.handleChange('firstName')}
                                  onFocus={this.handleFieldFocus('firstName')}
                                  onBlur={this.handleFieldFocus('firstName')}
                                  autoFocus={true}
                              />
                      </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <fieldset className={lastNameGroupClass}>
                            {lastName && <legend>{this.translate('page.body.kyc.identity.lastName')}</legend>}
                                <input
                                    className="pg-confirm__content-identity-col-row-content-number"
                                    type="string"
                                    placeholder={this.translate('page.body.kyc.identity.lastName')}
                                    value={lastName}
                                    onChange={this.handleChange('lastName')}
                                    onFocus={this.handleFieldFocus('lastName')}
                                    onBlur={this.handleFieldFocus('lastName')}
                                />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <fieldset className={dateOfBirthGroupClass}>
                            {dateOfBirth && <legend>{this.translate('page.body.kyc.identity.dateOfBirth')}</legend>}
                            <MaskInput
                                className="pg-confirm__content-identity-col-row-content-number"
                                maskString="00/00/0000"
                                mask="00/00/0000"
                                onChange={this.handleChangeDate}
                                onFocus={this.handleFieldFocus('dateOfBirth')}
                                onBlur={this.handleFieldFocus('dateOfBirth')}
                                value={dateOfBirth}
                                placeholder={this.translate('page.body.kyc.identity.dateOfBirth')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <div className="pg-confirm__content-identity-col-row-content">
                            <div className="pg-confirm__content-identity-col-row-content-label">
                                {metadata.nationality && this.translate('page.body.kyc.identity.nationality')}
                            </div>
                            <Dropdown
                                className="pg-confirm__content-documents-col-row-content-number"
                                list={dataNationalities}
                                onSelect={onSelectNationality}
                                placeholder={this.translate('page.body.kyc.identity.nationality')}
                            />
                        </div>
                    </div>
                </div>
                <div className="pg-confirm__content-identity-col pg-confirm__content-identity-col-right">
                    <div className="pg-confirm__content-identity-col-row">
                        <fieldset className={residentialAddressGroupClass}>
                            {residentialAddress && <legend>{this.translate('page.body.kyc.identity.residentialAddress')}</legend>}
                            <input
                                className="pg-confirm__content-identity-col-row-content-number"
                                type="string"
                                placeholder={this.translate('page.body.kyc.identity.residentialAddress')}
                                value={residentialAddress}
                                onChange={this.handleChange('residentialAddress')}
                                onFocus={this.handleFieldFocus('residentialAddress')}
                                onBlur={this.handleFieldFocus('residentialAddress')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <div className="pg-confirm__content-identity-col-row-content">
                            <div className="pg-confirm__content-identity-col-row-content-label">
                                {countryOfBirth && this.translate('page.body.kyc.identity.CoR')}
                            </div>
                            <Dropdown
                                className="pg-confirm__content-documents-col-row-content-number"
                                list={dataCountries}
                                onSelect={onSelectCountry}
                                placeholder={this.translate('page.body.kyc.identity.CoR')}
                            />
                        </div>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <fieldset className={cityGroupClass}>
                            {city && <legend>{this.translate('page.body.kyc.identity.city')}</legend>}
                            <input
                                className="pg-confirm__content-identity-col-row-content-number"
                                type="string"
                                placeholder={this.translate('page.body.kyc.identity.city')}
                                value={city}
                                onChange={this.handleChange('city')}
                                onFocus={this.handleFieldFocus('city')}
                                onBlur={this.handleFieldFocus('city')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <fieldset className={postcodeGroupClass}>
                            {postcode && <legend>{this.translate('page.body.kyc.identity.postcode')}</legend>}
                            <input
                                className="pg-confirm__content-identity-col-row-content-number"
                                type="string"
                                placeholder={this.translate('page.body.kyc.identity.postcode')}
                                value={postcode}
                                onChange={this.handleChange('postcode')}
                                onFocus={this.handleFieldFocus('postcode')}
                                onBlur={this.handleFieldFocus('postcode')}
                                onKeyPress={this.handleConfirmEnterPress}
                            />
                        </fieldset>
                    </div>
                </div>
              </div>
              {success && <p className="pg-confirm__success">{this.translate(success)}</p>}
              <div className="pg-confirm__content-deep">
                  <Button
                      className="pg-confirm__content-phone-deep-button"
                      label={this.translate('page.body.kyc.next')}
                      onClick={this.sendData}
                      disabled={this.handleCheckButtonDisabled()}
                  />
              </div>
          </div>
        );
    }

    private scrollToElement = (displayedElem: number) => {
            const element: HTMLElement = document.getElementsByClassName('pg-confirm__content-identity-col-row')[displayedElem] as HTMLElement;
            element && element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
    }

    private handleFieldFocus = (field: string) => {
        return () => {
            switch (field) {
                case 'city':
                    this.setState({
                        cityFocused: !this.state.cityFocused,
                    });
                    this.scrollToElement(6);
                    break;
                case 'dateOfBirth':
                    this.setState({
                        dateOfBirthFocused: !this.state.dateOfBirthFocused,
                    });
                    this.scrollToElement(2);
                    break;
                case 'firstName':
                    this.setState({
                        firstNameFocused: !this.state.firstNameFocused,
                    });
                    this.scrollToElement(0);
                    break;
                case 'lastName':
                    this.setState({
                        lastNameFocused: !this.state.lastNameFocused,
                    });
                    this.scrollToElement(1);
                    break;
                case 'postcode':
                    this.setState({
                        postcodeFocused: !this.state.postcodeFocused,
                    });
                    this.scrollToElement(7);
                    break;
                case 'residentialAddress':
                    this.setState({
                        residentialAddressFocused: !this.state.residentialAddressFocused,
                    });
                    this.scrollToElement(4);
                    break;
                default:
                    break;
            }

        };
    }

    private handleChange = (key: string) => {
        return (e: OnChangeEvent) => {
            // @ts-ignore
            this.setState({
                [key]: e.target.value,
            });
        };
    };

    private handleConfirmEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !this.handleCheckButtonDisabled()) {
            event.preventDefault();
            this.sendData();
        }
    }

    private handleChangeDate = (e: OnChangeEvent) => {
        this.setState({
            dateOfBirth: formatDate(e.target.value),
        });
    }

    private selectNationality = (value: string) => {
        this.setState({
            metadata: { nationality: value },
        });
    };

    private selectCountry = (value: string) => {
        this.setState({
            countryOfBirth: countries.getAlpha2Code(value, this.props.lang),
        });
    };

    private handleCheckButtonDisabled = () => {
        const {
            city,
            dateOfBirth,
            firstName,
            lastName,
            postcode,
            residentialAddress,
            countryOfBirth,
            metadata,
        } = this.state;
        return !firstName || !lastName  || !dateOfBirth || !metadata.nationality || !residentialAddress || !countryOfBirth || !city || !postcode;
    }

    private sendData = () => {
        const dob = !isDateInFuture(this.state.dateOfBirth) ? this.state.dateOfBirth : '';
        const profileInfo = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            dob,
            address: this.state.residentialAddress,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.countryOfBirth,
            metadata: {
                nationality: this.state.metadata.nationality,
            },
        };
        this.props.sendIdentity(profileInfo);
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    success: selectSendIdentitySuccess(state),
    lang: selectCurrentLanguage(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        sendIdentity: payload => dispatch(sendIdentity(payload)),
        labelFetch: () => dispatch(labelFetch()),
    });

// tslint:disable-next-line
export const Identity = injectIntl(connect(mapStateToProps, mapDispatchProps)(IdentityComponent) as any);
