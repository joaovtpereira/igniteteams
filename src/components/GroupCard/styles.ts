import styled from "styled-components/native";
import { CaretLeft } from 'phosphor-react-native'
import { TouchableOpacity } from "react-native";
import { UsersThree } from "phosphor-react-native"

export const Container = styled(TouchableOpacity)`
    align-items: center;
    width: 100%;
    flex-direction: row;
    height: 90px;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 6px;

    padding: 24px;
    margin-bottom: 12px;
`;

export const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_200};
`;

export const Icon = styled(UsersThree).attrs(({theme}) => ({
    size: 32,
    color: theme.COLORS.GREEN_700,
    weight: "fill"
}))`
    margin-right: 20px;
`


