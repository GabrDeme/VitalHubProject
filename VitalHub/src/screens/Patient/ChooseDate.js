import { Calendar } from 'react-native-calendars';
import React, { useEffect, useState } from 'react'
import { Container } from '../../components/Container/Style';
import { Title } from '../../components/Title/Style';
import { APP_COLORS } from '../../utils/App_colors';
import { FontAwesome } from '@expo/vector-icons';
import { SelectedList, ViewSelectedList } from '../../components/Dialogs/ScheduleAppointment';
import { TextLabel } from '../Doctor/MedicalRecord';
import { UnderlinedLink } from '../../components/Links/Style';
import { Button } from '../../components/Button/Button';
import CancelDialogs from '../../components/Dialogs/CalcelDialogs';

export default function ChooseDate({ navigation }) {

    const [selected, setSelected] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isModalScheduleVisible, setIsModalScheduleVisible] = useState(false);
    const [selectedInput, setSelectedInput] = useState("")

    useEffect(() => {

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year

        setCurrentDate(
            date + '/' + month + '/' + year
        )
    }, []);

    function handleScheduling() {
        setIsModalScheduleVisible(true)
    }


    async function handleGoBackPage() {
        await setIsModalScheduleVisible(false)
        navigation.navigate('HomePatient')
    }

    const data = [
        { key: '1', value: '08:00' },
        { key: '2', value: '09:00' },
        { key: '3', value: '10:00' },
        { key: '4', value: '11:00' },
        { key: '5', value: '12:00' },
        { key: '6', value: '13:00' },
        { key: '7', value: '14:00' },
        { key: '8', value: '15:00' },
        { key: '9', value: '16:00' },
        { key: '10', value: '17:00' },
        { key: '11', value: '18:00' },
        { key: '12', value: '19:00' },
        { key: '13', value: '20:00' },
        { key: '14', value: '21:00' },
        { key: '15', value: '22:00' }
    ]

    return (
        <Container>
            <Title
                marginTop={60}
            >
                Selecionar Data
            </Title>

            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}

                current={currentDate}

                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}

                style={{
                    backgroundColor: APP_COLORS.white,
                    width: 380,
                }}
            />

            <ViewSelectedList
                marginTopList={60}
            >

                <TextLabel
                    marginLeftLabel={15}
                >
                    Selecione um horário disponível
                </TextLabel>
                <SelectedList
                    data={data}
                    placeholder={'Selecionar horário'}
                    setSelected={setSelectedInput}
                    save={"save"}
                    onSelect={selectedInput}
                    boxStyles={{
                        borderColor: APP_COLORS.primary,
                        borderWidth: 2,
                        height: 60,
                        alignItems: 'center',
                        marginHorizontal: 10,
                        marginTop: 20
                    }}

                    dropdownStyles={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: 60,
                        right: 9.8,
                        width: "94.9%",
                        height: '80px',
                        zIndex: 1,
                        borderColor: APP_COLORS.primary,
                        borderWidth: "2px",
                        borderRadius: 5,
                        borderWidth: 2,
                        borderTopWidth: 0,
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                    }}
                    fontFamily='MontserratAlternates_600SemiBold'
                    dropdownTextStyles={{
                        color: APP_COLORS.primaryV1
                    }}
                    inputStyles={{
                        color: APP_COLORS.primaryV1
                    }}
                    arrowicon={<FontAwesome name="caret-down" size={24} color={APP_COLORS.primaryV1} />}
                />

            </ViewSelectedList>

            <Button
                title={'Continuar'}
                activeOpacity={.8}
                border={APP_COLORS.secondary}
                backgroundColor={APP_COLORS.secondary}
                color={APP_COLORS.white}
                marginTop={100}
                width={'95%'}
                onPress={() => handleScheduling()}
            />

            {/* Renderiza o Dialogs quando isModalVisible for true */}
            {isModalScheduleVisible && (
                <CancelDialogs
                    isVisible={isModalScheduleVisible}
                    bgColor={APP_COLORS.grayV6}
                    titleContent={"Agendar consulta"}
                    customContent={"Consulte os dados selecionados para a sua consulta"}
                    fontSizeText={"22px"}
                    fontSizeTextParagraf={"15px"}
                    onPressConfirm={() => {
                        handleGoBackPage()
                    }}
                    onPressCancel={() => { setIsModalScheduleVisible(false) }}
                    showCancelButton={true}
                    isModalScheduling={true}
                />
            )}

            <UnderlinedLink
                ColorText={APP_COLORS.secondary}
                buttonAlign={'center'}
                buttonOpacity={.6}
                textIntput={'Cancelar'}
                onClick={() => navigation.navigate("HomePatient")}
            />
        </Container>
    )
}