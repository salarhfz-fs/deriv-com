import React from 'react'
import styled from 'styled-components'
import MarketsAccordion from '../_markets_accordion.js'
import AvailablePlatforms from '../_available-platforms.js'
import { ContinuousIndices, CrashBoom, StepIndices } from '../sub-markets/_submarkets.js'
import { Text } from 'components/elements'
import { SectionContainer, Flex, CssGrid, Show } from 'components/containers'
import { localize, Localize } from 'components/localization'
import device from 'themes/device'
const Descriptions = styled.div`
    padding-bottom: 4rem;
    border-bottom: 1px solid var(--color-grey-21);
`
const Col = styled(Flex)`
    max-width: 13.2rem;

    @media ${device.tabletL} {
        max-width: 12rem;
    }
`
const MarketsWrapper = styled(Flex)`
    flex-direction: column;

    > div {
        margin-top: 2.4rem;
    }
`
const Row = styled(Flex)``
const StyledText = styled(Text)`
    @media ${device.tabletL} {
        font-size: 2rem;
        text-align: left;
    }
`
const MarketsList = styled(CssGrid)`
    border-left: 1px solid var(--color-grey-22);
    border-right: 1px solid var(--color-grey-22);
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    padding: 2.4rem 0.7rem;
    grid-row-gap: 1.6rem;

    @media ${device.tabletL} {
        grid-template-columns: ${(props) =>
            props.mobile_col_template ? props.mobile_col_template : 'repeat(1, 1fr)'};

        img {
            width: 16px;
            height: 16px;
            margin-right: 4px;
        }
        ${Text} {
            font-size: 1.5rem;
            line-height: 1.5;
        }
    }
`
const Title = styled(Text)`
    @media ${device.tabletL} {
        text-align: center;
        font-weight: 600;
        font-size: 14px;
    }
`

const DetailsContainer = styled(Flex)`
    flex-direction: column;

    ${Text} {
        font-size: 1.4rem;
        margin-top: 1.6rem;

        @media ${device.tabletL} {
            margin-top: 1rem;
        }
    }
`

const CrashText = styled(Text)`
    width: 690px;
    @media ${device.tabletL} {
        width: 100%;
    }
`

const ContinuousIndicesDetails = () => (
    <DetailsContainer>
        <Text>
            {localize(
                'These indices correspond to simulated markets with constant volatilities of 10%, 25%, 50%, 75%, and 100%.',
            )}
        </Text>
        <Text>
            <Localize
                translate_text="<0>One tick</0> is generated <0>every two seconds</0> for volatility indices <0>10, 25, 50, 75, and 100</0>."
                components={[<strong key={0} />]}
            />
        </Text>
        <Text>
            <Localize
                translate_text="<0>One tick</0> is generated <0>every second</0> for volatility indices <0>10 (1s), 25 (1s), 50 (1s), 75 (1s), and 100 (1s)</0>."
                components={[<strong key={0} />]}
            />
        </Text>
    </DetailsContainer>
)

const CrashBoomDetails = () => (
    <DetailsContainer>
        <CrashText>
            <Localize
                translate_text="With these indices, there is an average of one drop (crash) or one spike (boom) in prices that occur in a <0>series of 1000 or 500 ticks</0>."
                components={[<strong key={0} />]}
            />
        </CrashText>
    </DetailsContainer>
)
const StepIndicesDetails = () => (
    <DetailsContainer>
        <Text>
            <Localize
                translate_text="With these indices, there is an equal probability of up/down movement in a price series with a <0>fixed step size of 0.1</0>."
                components={[<strong key={0} />]}
            />
        </Text>
    </DetailsContainer>
)

const Multipliers = () => {
    return (
        <SectionContainer padding="4rem 0 8rem 0">
            <Flex max_width="79.2rem" m="0 auto" direction="column">
                <Descriptions>
                    <StyledText align="center">
                        {localize(
                            'Multipliers allow you to trade on leverage while limiting downside risk to your investment. You can maximise your potential profit by several multiples of any market movement without risking more than your initial investment.',
                        )}
                    </StyledText>
                    <AvailablePlatforms dtrader />
                </Descriptions>
                <StyledText weight="bold" mt="2.4rem">
                    {localize('Instruments available for multipliers trading')}
                </StyledText>
                <MarketsWrapper>
                    <MarketsAccordion
                        renderTitle={() => (
                            <Row jc="flex-start" ai="center">
                                <Col>
                                    <Title weight="bold" align="center">
                                        {localize('Continuous indices')}
                                    </Title>
                                </Col>
                                <MarketsList>
                                    <ContinuousIndices />
                                </MarketsList>
                            </Row>
                        )}
                        renderDetails={ContinuousIndicesDetails}
                    />
                    <MarketsAccordion
                        renderTitle={() => (
                            <Row jc="flex-start" ai="center">
                                <Col max_width="13.2rem">
                                    <Show.Desktop>
                                        <Title weight="bold" max_width="9.7rem" align="center">
                                            {localize('Crash/Boom')}
                                        </Title>
                                    </Show.Desktop>
                                    <Show.Mobile>
                                        <Title weight="bold" max_width="9.7rem" align="center">
                                            {localize('Crash/ Boom')}
                                        </Title>
                                    </Show.Mobile>
                                </Col>
                                <MarketsList>
                                    <CrashBoom />
                                </MarketsList>
                            </Row>
                        )}
                        renderDetails={CrashBoomDetails}
                    />
                    <MarketsAccordion
                        renderTitle={() => (
                            <Row jc="flex-start" ai="center">
                                <Col max_width="13.2rem">
                                    <Title weight="bold" max_width="9.7rem" align="center">
                                        {localize('Step indices')}
                                    </Title>
                                </Col>
                                <MarketsList>
                                    <StepIndices />
                                </MarketsList>
                            </Row>
                        )}
                        renderDetails={StepIndicesDetails}
                    />
                </MarketsWrapper>
                <Show.Eu>
                    <Text mt="1.6rem" color="grey-5" size="var(--text-size-xs)">
                        {localize(
                            'Return to Player (RTP) for multiplier options using multiplier 100 and duration of 1 hour is in the range of 98-99 % on an average. Using a different multiplier or duration may affect the RTP.',
                        )}
                    </Text>
                </Show.Eu>
            </Flex>
        </SectionContainer>
    )
}

export default Multipliers
