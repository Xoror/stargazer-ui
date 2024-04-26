import { useEffect, useState } from 'react'

import Button from "../../src/Button"
import Modal from "../../src/Modal"

const ModalPage = () => {
    const [showModal, setShowModal] = useState(false)
    const onHide = (event) => {
        console.log("test")
        setShowModal(false)
    }
    return (
        <>
            <Button onClick={(event) => setShowModal(true)}>
                Modal
            </Button>
            <Modal show={showModal} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Test Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae iaculis ante. Fusce in fringilla mauris, nec mattis nisl. Nam sed scelerisque diam. Vestibulum ac orci mattis ligula dictum elementum eget ac nisl. Mauris non sodales turpis, aliquet maximus elit. Morbi tempor faucibus vulputate. Integer suscipit sit amet sem in placerat. Pellentesque vulputate urna iaculis, luctus mi eget, sagittis felis. Pellentesque et odio egestas, vestibulum arcu vel, imperdiet orci. Vivamus sit amet posuere mauris. Nulla vehicula metus in lacinia viverra.

                        Curabitur eget convallis velit. Suspendisse gravida scelerisque quam vitae mattis. Nulla sollicitudin elementum augue, vitae viverra purus molestie sit amet. Suspendisse dapibus blandit velit eget porta. Aliquam vel justo nulla. Nulla facilisi. Praesent laoreet at metus feugiat sagittis. Nunc convallis ultrices finibus.

                        Curabitur in quam molestie, mollis lacus nec, commodo odio. Mauris pretium augue vel felis tempor scelerisque. Quisque commodo leo ipsum, sed tristique lectus laoreet eu. Quisque hendrerit iaculis tellus nec facilisis. Suspendisse maximus euismod ultrices. Praesent dignissim, diam ullamcorper dignissim tempus, sem metus ornare nunc, sed elementum diam ipsum nec enim. Duis congue dolor id ipsum tristique efficitur. Nulla eget arcu eget quam convallis interdum id id massa.

                        Quisque est leo, condimentum vitae sapien quis, tincidunt elementum libero. Maecenas feugiat purus a hendrerit molestie. Aliquam erat volutpat. Cras tempor eros augue, in consequat eros fringilla sed. Vivamus sed porta mi. Cras ac neque velit. Quisque at lectus in purus rutrum vehicula eu id orci. Phasellus vel leo maximus, gravida lorem at, aliquet elit. Aenean lacinia ipsum quam, in vehicula urna venenatis at. Suspendisse quis augue lectus. Pellentesque vitae venenatis mi. Maecenas at tortor convallis, feugiat sem nec, dictum tortor. Vestibulum porta fringilla velit, non consequat ex tincidunt et. Mauris vestibulum interdum vehicula. Quisque imperdiet malesuada enim vel aliquam. Integer nec metus at elit sodales rutrum.

                        Ut eu interdum tellus. Pellentesque efficitur sed odio ut tincidunt. Praesent sit amet mi in metus pretium suscipit a nec urna. Sed placerat lacinia neque quis lobortis. Morbi eu suscipit orci, nec varius massa. Donec sit amet lacus vitae est luctus ultricies vel id justo. Aliquam tincidunt eros lectus, eu vehicula nulla condimentum et. Mauris imperdiet feugiat ornare. Nam efficitur justo orci, eget laoreet risus lacinia eget. Praesent pharetra velit nec vulputate congue. Cras sit amet mattis purus. Nam ut facilisis purus. In egestas a mauris at feugiat.

                        Sed gravida urna velit, a luctus elit viverra nec. Vestibulum dictum arcu ac quam commodo, porta scelerisque dui gravida. Nullam vitae porta ex. Cras turpis orci, vehicula vel fermentum et, ornare in diam. Sed fermentum non felis et egestas. Cras vel pellentesque neque. Mauris nunc ligula, luctus vitae est quis, dignissim pharetra velit. Fusce vel eleifend enim. Nunc in tincidunt ligula, id faucibus magna. Morbi feugiat turpis vel tellus hendrerit, sed molestie arcu rutrum. Morbi sapien est, tristique id nisl et, ullamcorper pulvinar dolor. Curabitur pulvinar, lacus varius porta pretium, felis eros bibendum orci, id elementum nisl odio pharetra turpis. Sed volutpat mauris sit amet purus auctor, sit amet bibendum urna dignissim. Duis vulputate, enim at pellentesque pellentesque, est ex porta dui, vitae semper leo urna ac erat.

                        Cras efficitur, ante eget suscipit ornare, nisi turpis tempus nisl, vitae porta tellus diam at ante. Aliquam turpis quam, porta non congue sit amet, lobortis vitae dui. In lacus justo, tempor in maximus sed, consectetur quis ante. Aenean ullamcorper leo sed rutrum sollicitudin. Aenean lobortis est sit amet lacus tincidunt pharetra. Vivamus a finibus risus. Nam rutrum ac ex in auctor. Fusce vulputate semper eros quis eleifend. Duis ipsum lorem, rhoncus et turpis sit amet, ullamcorper facilisis augue. Phasellus placerat leo ac laoreet accumsan. Praesent sed ante est. Proin efficitur tortor vitae augue semper, et venenatis risus auctor.

                        Sed tristique turpis et sem fringilla sollicitudin. Sed non orci commodo, tincidunt nibh non, tincidunt nulla. Maecenas vel ultricies tortor. Proin iaculis risus vel turpis volutpat accumsan. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed ut nunc eget elit dapibus malesuada. Aliquam lectus eros, vehicula sit amet turpis nec, gravida mollis massa. Sed fringilla lacus ac mauris dapibus scelerisque. Aenean eget volutpat metus.

                        Vivamus sed egestas risus. Fusce venenatis dignissim tristique. Nullam faucibus porta tellus, eget tempor ex vestibulum in. Quisque dignissim ornare elit eget consectetur. Cras at leo turpis. Curabitur in magna sed dolor ultricies varius at et nulla. Curabitur sed neque lacus.

                        Etiam ullamcorper lobortis tempus. Phasellus a congue ipsum. Nulla a venenatis nibh. Nunc mattis viverra neque id blandit. Donec dapibus ex purus, ut scelerisque nunc hendrerit a. Praesent iaculis tortor eu odio egestas bibendum. Mauris ut lorem posuere, condimentum justo non, mollis erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin lacinia in diam in fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eget maximus est, ut suscipit quam. Sed ullamcorper dui mi, sit amet molestie nisi tincidunt a.

                        Nunc eu sodales augue, id luctus dui. Maecenas laoreet molestie feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce at dapibus erat, ut sagittis dui. Quisque tempus urna vitae ultricies hendrerit. Duis vehicula lobortis elit. Curabitur vel dictum felis. Integer eget consectetur sem. Aenean convallis semper quam, eget ultrices augue ultrices ut. Aenean in enim non nulla aliquet maximus eu id augue. Praesent rhoncus mi justo, eu pulvinar sapien condimentum in. In finibus molestie enim, vitae tempor eros molestie ut. Donec nunc quam, ornare et est et, posuere dictum orci. Phasellus in neque quis metus vestibulum fermentum. In et elit quis nisl pharetra porta.

                        Maecenas semper iaculis enim at scelerisque. Integer mollis ante faucibus mauris placerat consectetur. Sed sollicitudin faucibus orci a pellentesque. Nunc aliquam, tellus nec dignissim luctus, leo enim ornare dui, eget blandit ligula eros non dolor. Proin scelerisque erat sed ligula blandit rhoncus. Nullam scelerisque ornare tincidunt. Maecenas tincidunt ligula lacus, at sagittis augue convallis vel. Ut at scelerisque leo. Aliquam et tempor orci. Quisque eu rutrum nisi. Curabitur sodales condimentum risus. Integer nunc mauris, venenatis id aliquet id, ullamcorper faucibus erat. Fusce vitae ultrices massa, a mollis lorem. Nulla aliquet eros sed sollicitudin interdum. Aenean et quam vel nulla sodales mattis et quis eros. Curabitur ut aliquet arcu, vel cursus metus.

                        Suspendisse commodo nisl eget lacus dignissim, ut facilisis ante efficitur. Duis nisi nunc, sodales porttitor placerat non, finibus nec velit. Curabitur ullamcorper nisl turpis, vitae rutrum lacus porttitor vitae. Nulla dui dolor, fringilla vel ornare sed, condimentum vitae felis. Ut luctus lectus ipsum, quis scelerisque lacus congue non. Duis finibus blandit nisl. Sed lacus ipsum, fringilla in mattis sit amet, cursus a augue. Nulla vel faucibus ex. Integer ultricies tincidunt posuere. Vivamus eu elit ut leo suscipit dictum aliquam sed lectus. Phasellus fringilla commodo sem. Curabitur sit amet nisi accumsan, feugiat nibh nec, vestibulum sapien. Ut ac mauris posuere, accumsan libero sit amet, hendrerit tellus.

                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris velit diam, euismod a molestie ut, pulvinar quis ante. Donec pretium tincidunt pulvinar. Curabitur tincidunt leo et nunc sagittis fermentum. Nunc sollicitudin porta tempor. In pharetra libero blandit, luctus ex ac, finibus nibh. Nulla facilisi. Sed sit amet nibh tellus.

                        Maecenas dictum, quam id ultrices feugiat, dolor urna accumsan diam, sed consequat nisi dui et arcu. Nunc turpis odio, faucibus ac leo eget, malesuada molestie urna. Donec dapibus eros ac urna dapibus venenatis. Sed nunc massa, sagittis blandit sagittis a, convallis ut lorem. Ut at sem pellentesque justo lacinia consectetur at sed lorem. Ut nec massa ut justo tempor faucibus. Duis purus erat, pulvinar nec gravida quis, dictum porttitor mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <small>Test footer</small>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalPage